using MongoDB.Bson;
using MongoDB.Driver;
using BurningLab.Models;

namespace BurningLab.Services
{
    public class BurnLabService
    {
        private readonly IMongoDatabase _db;

        public BurnLabService(string connectionString, string database)
        {
            var client = new MongoClient(connectionString);
            _db = client.GetDatabase(database);
        }

        //CREATE user
        public async Task<List<Users>> CreateUser(string table, Users user)
        {
            var collection = _db.GetCollection<Users>(table);          
                await collection.InsertOneAsync(user);  
          
            var createdUser = await collection.Find(u => u.username == user.username).FirstOrDefaultAsync();
            return new List<Users> { createdUser };
        }


        //READ users
        public async Task<List<Users>> GetUsers(string table)
        {
            try
            {
                var collection = _db.GetCollection<Users>(table);
                var users = await collection.Find(_ => true).ToListAsync();
                return users;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetUsers: {ex.Message}");
                throw;  
            }
        }


        //read user by id
        public async Task<Users> GetUserById(string id, string table)
        {
            var collection = _db.GetCollection<Users>(table);
            var users = await collection.FindAsync(x => x.id == id);
            return await users.FirstOrDefaultAsync();
        }

        //UPDATE all of userdata
        public async Task<Users?> UpdateUser(string table, string id, Users updatedUser)
        {
            var collection = _db.GetCollection<Users>(table);
            var getUser = await collection.Find(x => x.id == id).FirstOrDefaultAsync();

            if (getUser == null)
            {
                return null;
            }

            getUser.username = updatedUser.username;
            getUser.name = updatedUser.name;
            getUser.password = updatedUser.password;
            await collection.ReplaceOneAsync(x => x.id == id, getUser);

            return getUser;
        }

        //update some userdata
        public async Task<Users?> PatchUpdateUser(string table, string id, Users updateUser)
        {
            var collection = _db.GetCollection<Users>(table);         
            var filter = Builders<Users>.Filter.Eq(u => u.id, id);
            var updateDef = new List<UpdateDefinition<Users>>();

            if (!string.IsNullOrEmpty(updateUser.name))
                updateDef.Add(Builders<Users>.Update.Set(u => u.name, updateUser.name));

            if (!string.IsNullOrEmpty(updateUser.username))
                updateDef.Add(Builders<Users>.Update.Set(u => u.username, updateUser.username));

            if (!string.IsNullOrEmpty(updateUser.password))
            {
                updateDef.Add(Builders<Users>.Update.Set(u => u.password, updateUser.password));
            }

            if (!updateDef.Any())
                return null;

            var update = Builders<Users>.Update.Combine(updateDef);
            var result = await collection.FindOneAndUpdateAsync(filter, update, new FindOneAndUpdateOptions<Users>
            {
                ReturnDocument = ReturnDocument.After
            });

            return result;
        }

        //DELETE user
        public async Task<string> DeleteUser(string table, string id)
        {
            var collection = _db.GetCollection<Users>(table);
            var result = await collection.DeleteOneAsync(x => x.id == id);

            return result.DeletedCount > 0 ? "Användaren togs bort" : "Användaren hittades inte";
        }

        //skapa svar
        public async Task<List<Answers>> CreateAnswer(string table, Answers answer)
        {
            var collection = _db.GetCollection<Answers>(table);
            await collection.InsertOneAsync(answer);
            return collection.AsQueryable().ToList();
        }

        // Hämta alla svar
        public async Task<List<Answers>> GetAnswers(string table)
        {
            var collection = _db.GetCollection<Answers>(table);
            return await collection.Find(_ => true).ToListAsync();
        }

        //hämta ideer
        public async Task<List<Ideas>> GetIdeas(string table)
        {
            var collection = _db.GetCollection<Ideas>(table);
            return await collection.Find(_ => true).ToListAsync();
        }
    }
}
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
        public async Task<List<Users>> CreateUser( Users user)
        {
            var collection = _db.GetCollection<Users>("Users");          
                await collection.InsertOneAsync(user);  
          
            var createdUser = await collection.Find(user => user.username == user.username).FirstOrDefaultAsync();
            return new List<Users> { createdUser };
        }

        //READ users
        public async Task<List<Users>> GetUsers()
        {
            try
            {
                var collection = _db.GetCollection<Users>("Users");
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
        public async Task<Users> GetUserById(string id)
        {
            var collection = _db.GetCollection<Users>("Users");
            var users = await collection.FindAsync(x => x.id == id);
            return await users.FirstOrDefaultAsync();
        }

        //UPDATE all of userdata
        public async Task<Users?> UpdateUser(string id, Users updatedUser)
        {
            var collection = _db.GetCollection<Users>("Users");
            var getUser = await collection.Find(user => user.id == id).FirstOrDefaultAsync();

            if (getUser == null)
            {
                return null;
            }

            getUser.username = updatedUser.username;
            getUser.name = updatedUser.name;
            getUser.password = updatedUser.password;
            await collection.ReplaceOneAsync(user => user.id == id, getUser);

            return getUser;
        }

        //update some userdata
        public async Task<Users?> PatchUpdateUser(string id, Users updateUser)
        {
            var collection = _db.GetCollection<Users>("Users");         
            var filter = Builders<Users>.Filter.Eq(user => user.id, id);
            var updateDef = new List<UpdateDefinition<Users>>();

            if (!string.IsNullOrEmpty(updateUser.name))
                updateDef.Add(Builders<Users>.Update.Set(user => user.name, updateUser.name));

            if (!string.IsNullOrEmpty(updateUser.username))
                updateDef.Add(Builders<Users>.Update.Set(user => user.username, updateUser.username));

            if (!string.IsNullOrEmpty(updateUser.password))
            {
                updateDef.Add(Builders<Users>.Update.Set(user => user.password, updateUser.password));
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
        public async Task<string> DeleteUser(string id)
        {
            var collection = _db.GetCollection<Users>("Users");
            var ideas = await GetIdeas(id);
            ideas.ForEach(async idea => await DeleteIdea(idea.id));
        
            var result = await collection.DeleteOneAsync(user => user.id == id);

            return result.DeletedCount > 0 ? "Användaren togs bort" : "Användaren hittades inte";
        }

        //skapa svar
        public async Task<List<Answers>> CreateAnswer( Answers answer)
        {
            var collection = _db.GetCollection<Answers>("Answers");
            await collection.InsertOneAsync(answer);
            return collection.AsQueryable().ToList();
        }

        // Hämta alla svar
        public async Task<List<Answers>> GetAnswers()
        {
            var collection = _db.GetCollection<Answers>("Answers");
            return await collection.Find(_ => true).ToListAsync();
        }

        //skapa ideer
        public async Task<Ideas> CreateIdea( Ideas idea )
        {
            var ideasCollection = _db.GetCollection<Ideas>("Ideas");
            var answersCollection = _db.GetCollection<Answers>("Answers");

            var randomAnswer = await answersCollection.Aggregate()
                .Sample(1) 
                .FirstOrDefaultAsync();

            if (randomAnswer == null)
            {
                throw new Exception("Inga svar hittades i databasen.");
            }

            var newIdea = new Ideas
            {

                id = ObjectId.GenerateNewId().ToString(),
                IdeaTitle = idea.IdeaTitle,
                IdeaText = idea.IdeaText,
                AnswerText = randomAnswer.AnswerText,
                CreatedAt = DateTime.UtcNow,
                UserId = idea.UserId

            };

            await ideasCollection.InsertOneAsync(newIdea);
            return newIdea;
        }

        //hämta ideer
        public async Task<List<Ideas>> GetIdeas( string UserId = null)
        {
            var collection = _db.GetCollection<Ideas>("Ideas");
            if (UserId == null)
            {
            return await collection.Find(_ => true).ToListAsync();
            }
            
            return await collection.Find(idea => idea.UserId == UserId).ToListAsync();
        }

        //hämta en specifik idé
        public async Task<Ideas> GetIdeaById( string id)
        {
            var collection = _db.GetCollection<Ideas>("Ideas");
            var idea = await collection.FindAsync(i => i.id == id);
            return await idea.FirstOrDefaultAsync();
        }

        //raderra idé
        public async Task<string> DeleteIdea(string id)
        {
            var collection = _db.GetCollection<Ideas>("Ideas");
            var result = await collection.DeleteOneAsync(idea => idea.id == id);

            return result.DeletedCount > 0 ? "Idén togs bort" : "Idén hittades inte";
        }
    }
}
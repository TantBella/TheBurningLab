using MongoDB.Bson;
using MongoDB.Driver;
using BurningLab.Models;

namespace BurningLab.Services
{
    public class BurnLabService
    {
        private IMongoDatabase db;

        public BurnLabService(string connectionString, string database)
        {
            var client = new MongoClient(connectionString);
            db = client.GetDatabase(database);
            CreateIndexes().Wait();
        }

        //skapa svar
        public async Task<List<Answers>> CreateAnswer(string table, Answers answer)
        {
            var collection = db.GetCollection<Answers>(table);
            await collection.InsertOneAsync(answer);
            return collection.AsQueryable().ToList();
        }

        // Hämta alla svar
        public async Task<List<Answers>> GetAnswers(string table)
        {
            var collection = db.GetCollection<Answers>(table);
            return await collection.Find(_ => true).ToListAsync();
        }

        // Slumpa fram ett svar
        //public async Task<Answers> GetRandomdAnswer(string table)
        //{
        //    var collection = db.GetCollection<Answers>(table);
        //    var answers = await collection.Find(_ => true).ToListAsync();

        //    if (answers.Count == 0) return null;

        //    var random = new Random();
        //    var randomAnswer = answers[random.Next(answers.Count)];
        //    return randomAnswer;
        //}

        public async Task SaveUserIdea(string userId, Ideas idea)
        {
            var collection = db.GetCollection<Ideas>("Answers");
            await collection.InsertOneAsync(idea);
        }

        private async Task CreateIndexes()
        {
            var userCollection = db.GetCollection<Users>("Users");
            var indexKeysDefinition = Builders<Users>.IndexKeys.Ascending(u => u.UserName);
            var indexModel = new CreateIndexModel<Users>(indexKeysDefinition, new CreateIndexOptions { Unique = true });
            await userCollection.Indexes.CreateOneAsync(indexModel);
        }

        public async Task<List<Users>> CreateUser(string table, Users user)
        {
            var collection = db.GetCollection<Users>(table);

            try
            {
                await collection.InsertOneAsync(user);
            }
            catch (MongoWriteException ex) when (ex.WriteError.Category == ServerErrorCategory.DuplicateKey)
            {
                throw new Exception("Användarnamnet är redan taget. Välj ett annat.");
            }

            return collection.AsQueryable().ToList();
        }

        public async Task<List<Users>> GetUsers(string table)
        {
            var collection = db.GetCollection<Users>(table);
            return await collection.Find(_ => true).ToListAsync();
        }

        public async Task<Users> UpdateUser(string table, Users user)
        {
            var collection = db.GetCollection<Users>(table);
            await collection.ReplaceOneAsync(x => x.UserId == user.UserId, user);
            return user;
        }

        public async Task<string> DeleteUser(string table, ObjectId id)
        {
            var collection = db.GetCollection<Users>(table);
            var result = await collection.DeleteOneAsync(x => x.UserId == id);
            return result.DeletedCount > 0 ? "Användaren togs bort" : "Användaren hittades inte";
        }
    }
}
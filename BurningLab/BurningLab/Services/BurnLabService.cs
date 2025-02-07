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

        //hämta slumpmässiga svar
        public async Task<Answers> GetRandomAnswer()
        {
            var answersCollection = db.GetCollection<Answers>("Answers");
            var allAnswers = await answersCollection.Find(FilterDefinition<Answers>.Empty).ToListAsync();
            if (allAnswers.Count > 0)
            {
                var randomIndex = new Random().Next(allAnswers.Count);
                return allAnswers[randomIndex]; 
            }
            return null;
            //var randomAnswer = await answersCollection.Aggregate()
            //    .Sample(1)
            //    .FirstOrDefaultAsync();

            //return randomAnswer;
        }


        //skapa idder
        public async Task<List<Ideas>> SaveUserIdea(string table, Ideas idea)
        {
            var ideasCollection = db.GetCollection<Ideas>("Ideas");
            var answersCollection = db.GetCollection<Answers>("Answers");
            var randomAnswer = await GetRandomAnswer();
            idea.AnswerText = randomAnswer != null ? randomAnswer.AnswerText : "Inget svar hittades.";
            await ideasCollection.InsertOneAsync(idea);


            return ideasCollection.AsQueryable().ToList();
        }

        //hämta ideer
        public async Task<List<Ideas>> GetIdeas(string table)
        {
            var collection = db.GetCollection<Ideas>(table);
            return await collection.Find(_ => true).ToListAsync();
        }


        public async Task<string> DeleteIdea(string table, ObjectId id)
        {
            var collection = db.GetCollection<Ideas>(table);
            var result = await collection.DeleteOneAsync(x => x.IdeaId == id);
            return result.DeletedCount > 0 ? "Idén togs bort" : "Idén finns inte";
        }


        private async Task CreateIndexes()
        {
            var userCollection = db.GetCollection<Users>("Users");
            var indexKeysDefinition = Builders<Users>.IndexKeys.Ascending(u => u.username);
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
            await collection.ReplaceOneAsync(x => x.userId == user.userId, user);
            return user;
        }

        public async Task<string> DeleteUser(string table, ObjectId id)
        {
            var collection = db.GetCollection<Users>(table);
            var result = await collection.DeleteOneAsync(x => x.userId == id);
            return result.DeletedCount > 0 ? "Användaren togs bort" : "Användaren hittades inte";
        }
    }
}
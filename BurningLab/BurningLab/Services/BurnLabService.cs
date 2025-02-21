﻿using MongoDB.Bson;
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
            CreateIndexes().Wait();
        }

        private async Task CreateIndexes()
        {
            var userCollection = _db.GetCollection<Users>("Users");
            var indexKeysDefinition = Builders<Users>.IndexKeys.Ascending(u => u.username);
            var indexModel = new CreateIndexModel<Users>(indexKeysDefinition, new CreateIndexOptions { Unique = true });
            await userCollection.Indexes.CreateOneAsync(indexModel);
        }


        //CREATE user
        public async Task<List<Users>> CreateUser(string table, Users user)
        {
            var collection = _db.GetCollection<Users>(table);

            try
            {
                user.id = Guid.NewGuid().ToString();
                await collection.InsertOneAsync(user); 
            }
            catch (MongoWriteException ex) when (ex.WriteError.Category == ServerErrorCategory.DuplicateKey)
            {
                throw new Exception("Användarnamnet är redan taget. Välj ett annat.");
            }

            var createdUser = await collection.Find(u => u.username == user.username).FirstOrDefaultAsync();
            return new List<Users> { createdUser }; 
        }


        //READ user
        public async Task<List<Users>> GetUsers(string table)
        {
            var collection = _db.GetCollection<Users>(table);
            return await collection.Find(_ => true).ToListAsync();
        }

        //UPDATE user
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

        //DELETE user
        public async Task<string> DeleteUser(string table, string id)
        {
            var collection = _db.GetCollection<Users>(table);
            //var result = await collection.DeleteOneAsync(x => x._id == id.ToString());
            //return result.DeletedCount > 0 ? "Användaren togs bort" : "Användaren hittades inte";
            await collection.DeleteOneAsync(x => x.id == id);
            return "";
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
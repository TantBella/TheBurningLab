using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace BurningLab.Models
{
    public class Users
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]

        public string id { get; set; }
        public string name { get; set; }

        [BsonElement("username")]
        [BsonRequired]
        public string username { get; set; }

        public string password { get; set; }
    }

}
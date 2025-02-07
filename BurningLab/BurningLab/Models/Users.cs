using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace BurningLab.Models
{
    public class Users
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]

        public ObjectId userId { get; set; } 
        public string name { get; set; }
        [BsonElement("username")]
        [BsonRequired]
        public string username { get; set; }
        public string password { get; set; }
        public string profilepicture { get; set; }
        public List<Ideas> Ideas { get; set; }
        public List<Answers> Answers { get; set; }
    }
}
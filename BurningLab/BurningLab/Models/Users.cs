using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace BurningLab.Models
{
    public class Users
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]

        public ObjectId UserId { get; set; }
        public string Name { get; set; }
        [BsonElement("username")]
        [BsonRequired]
        public string UserName { get; set; }
        public string PassWord { get; set; }
        public string ProfilePicture { get; set; }
        public List<Ideas> Ideas { get; set; }
        public List<Answers> Answers { get; set; }
    }
}
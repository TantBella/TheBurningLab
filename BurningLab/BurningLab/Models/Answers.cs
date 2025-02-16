using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace BurningLab.Models
{
    public class Answers
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId _id { get; set; }
        public string AnswerText { get; set; }
    }
}
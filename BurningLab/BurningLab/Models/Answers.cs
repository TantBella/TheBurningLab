using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace BurningLab.Models
{
    public class Answers
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId AnswerId { get; set; }
        public string AnswerText { get; set; }
    }
}
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace BurningLab.Models
{
    public class Ideas
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }
        public ObjectId IdeaId { get; set; }
        public string IdeaText { get; set; }
        public string AnswerText { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
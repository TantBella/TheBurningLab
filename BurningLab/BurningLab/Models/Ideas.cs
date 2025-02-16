using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BurningLab.Models
{
    public class Ideas
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]

        public ObjectId _id { get; set; }

        public string IdeaTitle { get; set; }
        public string IdeaText { get; set; }
        public string AnswerText { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public ObjectId UserId { get; set; }
    }
}

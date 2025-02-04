using BurningLab.Models;
using BurningLab.Services;
using MongoDB.Bson;

namespace BurningLab
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddAuthorization();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();
            BurnLabService db = new BurnLabService("TheBurnLab");

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();

            // Skapa svar
            app.MapPost("/Answers", async (Answers answer) =>
            {
                var createdAnswer = await db.CreateAnswer("Answers", answer);
                return Results.Ok(createdAnswer);
            });

            // Hämta alla  svar
            app.MapGet("/Answers", async () =>
            {
                var answers = await db.GetAnswers("Answers");
                return Results.Ok(answers);
            });


            //hämta user
            app.MapGet("/Users", async () =>
            {
                var users = await db.GetUsers("Users");
                return Results.Ok(users);
            });

            //Lägg till user
            app.MapPost("/User", async (Users user) =>
            {
                var testDB = await db.CreateUser("Users", user);
                return Results.Ok(testDB);
            });

            //uppdatera user
            app.MapPut("/User", async (Users updateUser) =>
            {
                var user = await db.UpdateUser("Users", updateUser);
                return Results.Ok(user);
            });

            //ta bort user
            app.MapDelete("/user/{id}", async (ObjectId id) =>
            {
                var user = await db.DeleteUser("Users", id);
                return Results.Ok(user);
            });

            app.Run();
        }
    }
}
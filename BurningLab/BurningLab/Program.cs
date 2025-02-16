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
            var mongoConnectionString = builder.Configuration["ConnectionStrings:MongoDB"];
            var databaseName = "TheBurnLab";

            BurnLabService db = new BurnLabService(mongoConnectionString, databaseName);

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();              

            //CREATE user
            app.MapPost("/User", async (Users user) =>
            {
                var testDB = await db.CreateUser("Users", user);
                return Results.Ok(testDB);
            });

            //READ users
            app.MapGet("/Users", async () =>
            {
                var users = await db.GetUsers("Users");
                return Results.Ok(users);
            });

            //UPDATE user
            app.MapPut("/User", async (Users updateUser) =>
            {
                var user = await db.UpdateUser("Users", updateUser);
                return Results.Ok(user);
            });

            //DELETE user
            app.MapDelete("/user/{id}", async (ObjectId id) =>
            {
                var user = await db.DeleteUser("Users", id);
                return Results.Ok(user);
            });

            // Skapa svar
            app.MapPost("/Answers", async (Answers answer) =>
            {
                var createdAnswer = await db.CreateAnswer("Answers", answer);
                return Results.Ok(createdAnswer);
            });

            // H�mta alla  svar
            app.MapGet("/Answers", async () =>
            {
                var answers = await db.GetAnswers("Answers");
                return Results.Ok(answers);
            });         

            //h�mta alla ideer
            app.MapGet("/Ideas", async () =>
            {
                var idea = await db.GetIdeas("Ideas");
                return Results.Ok(idea);
            });

            app.Run();
        }
    }
}
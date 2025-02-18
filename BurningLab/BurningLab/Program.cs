using BurningLab.Models;
using BurningLab.Services;
using Microsoft.AspNetCore.Mvc;
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

            var mongoConnectionString = builder.Configuration.GetConnectionString("MongoDB");
            var databaseName = "TheBurnLab";

            builder.Services.AddSingleton<BurnLabService>(sp =>
    new BurnLabService(mongoConnectionString, databaseName));

            var app = builder.Build();          


         
            //var mongoConnectionString = builder.Configuration["ConnectionStrings:MongoDB"];
            //var databaseName = "TheBurnLab";

            //BurnLabService db = new BurnLabService(mongoConnectionString, databaseName);

            //if (app.Environment.IsDevelopment())
            //{
                app.UseSwagger();
                app.UseSwaggerUI();
            //}

            app.UseHttpsRedirection();
            app.UseAuthorization();

            //CREATE user
            app.MapPost("/User", async (BurnLabService service, Users user) =>
            {
                var users = await service.CreateUser("Users", user);
                return Results.Ok(users);
            });


            //READ users
            app.MapGet("/Users", async (BurnLabService service) =>
            {
                var users = await service.GetUsers("Users");
                return Results.Ok(users);
            });


            //UPDATE user
            app.MapPut("/User", async (BurnLabService service, Users updateUser) =>
            {
                var user = await service.UpdateUser("Users", updateUser);
                return Results.Ok(user);
            });


            //DELETE user
            app.MapDelete("/user/{id}", async (BurnLabService service, string id) =>
            {
                var user = await service.DeleteUser("Users", new ObjectId(id));
                return Results.Ok(user);
            });


            // Inloggnings endpoint
            app.MapPost("/signin", async (BurnLabService service, Users loginUser) =>
            {
                var users = await service.GetUsers("Users");

                var user = users.FirstOrDefault(u => u.username == loginUser.username);

                if (user == null || user.password != loginUser.password)
                    return Results.Unauthorized();

                return Results.Ok(new { message = "Inloggad!", userId = user._id });
            });

            // Skapa svar
            app.MapPost("/Answers", async (BurnLabService service, Answers answer) =>
            {
                var createdAnswer = await service.CreateAnswer("Answers", answer);
                return Results.Ok(createdAnswer);
            });

            // Hämta alla  svar
            app.MapGet("/Answers", async (BurnLabService service) =>
            {
                var answers = await service.GetAnswers("Answers");
                return Results.Ok(answers);
            });

            //hämta alla ideer
            app.MapGet("/Ideas", async (BurnLabService service) =>
            {
                var idea = await service.GetIdeas("Ideas");
                return Results.Ok(idea);
            });

            app.Run();
        }
    }
}
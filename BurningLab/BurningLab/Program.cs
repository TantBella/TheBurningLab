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
            builder.Services.AddControllers();
            builder.Services.AddAuthorization();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var mongoConnectionString = builder.Configuration.GetConnectionString("MongoDB");
            var databaseName = "TheBurnLab";

            builder.Services.AddSingleton<BurnLabService>(sp =>
    new BurnLabService(mongoConnectionString, databaseName));

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:5173") 
                              .AllowAnyMethod()
                              .AllowAnyHeader()
                              .AllowCredentials();
                    });
            });

            var app = builder.Build();
            app.UseCors("AllowFrontend");

            //if (app.Environment.IsDevelopment())
            //{
            app.UseSwagger();
            app.UseSwaggerUI();
            //}

            app.UseHttpsRedirection();
            app.UseAuthorization();

            //CREATE user
            app.MapPost("/signup", async (BurnLabService service, Users user) =>
            {
                var users = await service.CreateUser("Users", user);
                return Results.Ok(users);
            });


            //READ users
            app.MapGet("/users", async (BurnLabService service) =>
            {
                var users = await service.GetUsers("Users");
                return Results.Ok(users);
            });

            //read one user
            app.MapGet("/user/{id}", async (string id, BurnLabService service) =>
            {
                var user = await service.GetUserById(id, "Users"); 
                return user != null ? Results.Ok(user) : Results.NotFound("Anv�ndaren hittades inte.");
            });

            //UPDATE all userdata 
            app.MapPut("/editaccount/{id}", async (BurnLabService service, string id, Users updateUser) =>
            {
                var updatedUser = await service.UpdateUser("Users", id, updateUser);

                if (updatedUser == null)
                {
                    return Results.NotFound("Anv�ndaren hittades inte.");
                }
                return Results.Ok(updatedUser);
            });

            //Update some userata
            app.MapPatch("/editaccount/{id}", async (string id, BurnLabService service, Users updateUser) =>
            {
                var updatedUser = await service.PatchUpdateUser("Users", id, updateUser);
                if (updatedUser == null)
                {
                    return Results.BadRequest("Inga �ndringar gjordes eller anv�ndaren kunde inte hittas.");
                }
                return Results.Ok(new { message = "Kontouppgifter uppdaterade!", updatedUser });
            });

            //DELETE user
            app.MapDelete("/deleteaccount/{id}", async (BurnLabService service, string id) =>
            {
                var user = await service.DeleteUser("Users", id);
                return Results.Ok(user);
            });

            // Inloggnings endpoint
            app.MapPost("/signin", async (BurnLabService service, Users loginUser) =>
            {
                var users = await service.GetUsers("Users");
                var user = users.FirstOrDefault(u => u.username == loginUser.username);
                if (user == null || user.password != loginUser.password)
                    return Results.Unauthorized();

                return Results.Ok(new { message = "Inloggad!", userId = user.id, user.name,user.username });
            });

            // Skapa svar
            app.MapPost("/Answers", async (BurnLabService service, Answers answer) =>
            {
                var createdAnswer = await service.CreateAnswer("Answers", answer);
                return Results.Ok(createdAnswer);
            });

            // H�mta alla  svar
            app.MapGet("/Answers", async (BurnLabService service) =>
            {
                var answers = await service.GetAnswers("Answers");
                return Results.Ok(answers);
            });

            //h�mta alla ideer
            app.MapGet("/Ideas", async (BurnLabService service) =>
            {
                var idea = await service.GetIdeas("Ideas");
                return Results.Ok(idea);
            });

            app.MapControllers();
            app.Run();
        }
    }
}
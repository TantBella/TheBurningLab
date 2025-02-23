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
                var users = await service.CreateUser( user);
                return Results.Ok(users);
            });

            //READ users
            app.MapGet("/users", async (BurnLabService service) =>
            {
                var users = await service.GetUsers();
                return Results.Ok(users);
            });

            //read one user
            app.MapGet("/user/{id}", async (string id, BurnLabService service) =>
            {
                var user = await service.GetUserById(id); 
                return user != null ? Results.Ok(user) : Results.NotFound("Användaren hittades inte.");
            });

            //UPDATE all userdata 
            app.MapPut("/editaccount/{id}", async (BurnLabService service, string id, Users updateUser) =>
            {
                var updatedUser = await service.UpdateUser( id, updateUser);

                if (updatedUser == null)
                {
                    return Results.NotFound("Användaren hittades inte.");
                }
                return Results.Ok(updatedUser);
            });

            //Update some userata
            app.MapPatch("/editaccount/{id}", async (string id, BurnLabService service, Users updateUser) =>
            {
                var updatedUser = await service.PatchUpdateUser( id, updateUser);
                if (updatedUser == null)
                {
                    return Results.BadRequest("Inga ändringar gjordes eller användaren kunde inte hittas.");
                }
                return Results.Ok(new { message = "Kontouppgifter uppdaterade!", updatedUser });
            });

            //DELETE user
            app.MapDelete("/deleteaccount/{id}", async (BurnLabService service, string id) =>
            {
                var message = await service.DeleteUser( id);
                return Results.Ok(message);
            });

            // Inloggnings endpoint
            app.MapPost("/signin", async (BurnLabService service, Users loginUser) =>
            {
                var users = await service.GetUsers();
                var user = users.FirstOrDefault(u => u.username == loginUser.username);
                if (user == null || user.password != loginUser.password)
                    return Results.Unauthorized();

                return Results.Ok(new { message = "Inloggad!", userId = user.id, user.name,user.username });
            });

            // Skapa svar
            app.MapPost("/answer", async (BurnLabService service, Answers answer) =>
            {
                var createdAnswer = await service.CreateAnswer( answer);
                return Results.Ok(createdAnswer);
            });

            // Hämta alla  svar
            app.MapGet("/answers", async (BurnLabService service) =>
            {
                var answers = await service.GetAnswers();
                return Results.Ok(answers);
            });

            //skapa ideer
            app.MapPost("/newidea", async (BurnLabService service, Ideas idea) =>
            {
                try
                {
                    var newIdea = await service.CreateIdea( idea);
                    return Results.Ok(newIdea);
                }
                catch (Exception ex)
                {
                    return Results.BadRequest("Misslyckades att skapa idén: {ex.Message}");
                }
            });

            //hämta alla ideer
            app.MapGet("/ideas", async (BurnLabService service) =>
            {
                var ideas = await service.GetIdeas();        
               return Results.Ok(ideas);
            });

            //hämta alla ideer som hör till en specidfik användare
            app.MapGet("/ideas/{UserId}", async ( BurnLabService service, string UserId) =>
            {
                var ideas = await service.GetIdeas( UserId);
                return Results.Ok(ideas);
            });

            //hämta en specifik idé
            app.MapGet("/idea/{id}", async (BurnLabService service, string id) =>
            {
                var idea = await service.GetIdeaById(id);
                return idea == null ? Results.NotFound() : Results.Ok(idea);
            });

            //radera en idé
            app.MapDelete("/idea/{id}/delete", async (BurnLabService service, string id) =>
            {
                var message = await service.DeleteIdea(id);
                return Results.Ok(message);
            });

            app.MapControllers();
            app.Run();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Portfolio> Portfolios { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Portfolio>().HasKey(p => new { p.AppUserId, p.StockId });
            builder.Entity<Portfolio>()
                .HasOne(p => p.AppUser)
                .WithMany(u => u.Portfolios)
                .HasForeignKey(p => p.AppUserId);
            builder.Entity<Portfolio>()
                .HasOne(p => p.Stock)
                .WithMany(s => s.Portfolios)
                .HasForeignKey(p => p.StockId);

           List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole { Id = "c3f1a141-8601-4475-a83d-0d67412f716a", Name = "Admin", NormalizedName = "ADMIN", ConcurrencyStamp = "b3ce6abd-bf1f-428e-a5c0-7e7ca90acd2a" },
                new IdentityRole { Id = "fa2bc923-d648-43e8-971c-4b5cb38d675b",Name = "User", NormalizedName = "USER", ConcurrencyStamp = "75d45425-e3b5-4222-a73c-baa7b857b132" }
            };
            
            builder.Entity<Comment>().Property(c => c.CreatedOn).HasDefaultValueSql("GETUTCDATE()");
            builder.Entity<IdentityRole>().HasData(roles);

            
        }   
    }
}
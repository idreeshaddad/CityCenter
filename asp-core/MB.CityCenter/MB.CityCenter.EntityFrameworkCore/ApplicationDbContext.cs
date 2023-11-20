using MB.CityCenter.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace MB.CityCenter.EntityFrameworkCore
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }


        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<OrderProduct>()
                        .HasKey(op => new { op.OrderId, op.ProductId });

            modelBuilder.Entity<Order>()
                            .Property(p => p.TotalPrice)
                            .HasColumnType("decimal(18,4)");

            modelBuilder.Entity<Product>()
                        .Property(p => p.Price)
                        .HasColumnType("decimal(18,4)");

            modelBuilder.Entity<Brand>()
                        .HasIndex(u => u.Name)
                        .IsUnique();

            modelBuilder.Entity<Brand>()
                        .Property(u => u.Name)
                        .HasMaxLength(40);

            modelBuilder.Entity<ProductType>()
                        .HasIndex(u => u.Name)
                        .IsUnique();
        }
    }
}

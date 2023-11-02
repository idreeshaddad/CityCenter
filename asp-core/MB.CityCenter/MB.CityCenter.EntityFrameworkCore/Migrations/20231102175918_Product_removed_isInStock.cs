using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MB.CityCenter.EntityFrameworkCore.Migrations
{
    /// <inheritdoc />
    public partial class Product_removed_isInStock : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsInStock",
                table: "Products");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsInStock",
                table: "Products",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}

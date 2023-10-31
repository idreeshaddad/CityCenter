using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MB.CityCenter.EntityFrameworkCore.Migrations
{
    /// <inheritdoc />
    public partial class Cusomer_typo_fix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DataOfBirth",
                table: "Customers",
                newName: "DateOfBirth");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateOfBirth",
                table: "Customers",
                newName: "DataOfBirth");
        }
    }
}

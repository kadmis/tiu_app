using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi.Migrations
{
    public partial class AddedNormalizedNamesToRoles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "NormalizedName" },
                values: new object[] { "185017ee-fb9d-4dc9-bec3-fd4a2892eeb2", "CASUAL" });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "NormalizedName" },
                values: new object[] { "40700f8d-e0cb-489e-a966-3e21ef5cd007", "ADMIN" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "NormalizedName" },
                values: new object[] { "fa720e9b-ce94-4ac9-a92d-31369c2ec4d2", null });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "NormalizedName" },
                values: new object[] { "748ecdee-beae-4f00-9eb8-5057b038d6e2", null });
        }
    }
}

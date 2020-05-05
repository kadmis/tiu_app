using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Planets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PlanetNumber = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    ImagePath = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Planets", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Planets",
                columns: new[] { "Id", "Description", "ImagePath", "Name", "PlanetNumber" },
                values: new object[] { 1, "Trzecia, licząc od Słońca, oraz piąta pod względem wielkości planeta Układu Słonecznego.", "assets/earth.jpg", "Ziemia", 3 });

            migrationBuilder.InsertData(
                table: "Planets",
                columns: new[] { "Id", "Description", "ImagePath", "Name", "PlanetNumber" },
                values: new object[] { 2, "Druga pod względem odległości od Słońca planeta Układu Słonecznego.", "assets/venus.jpg", "Wenus", 2 });

            migrationBuilder.InsertData(
                table: "Planets",
                columns: new[] { "Id", "Description", "ImagePath", "Name", "PlanetNumber" },
                values: new object[] { 3, "Najmniejsza i najbliższa Słońca planeta Układu Słonecznego.", "assets/mercury.jpg", "Merkury", 1 });

            migrationBuilder.InsertData(
                table: "Planets",
                columns: new[] { "Id", "Description", "ImagePath", "Name", "PlanetNumber" },
                values: new object[] { 4, "Ósma, najdalsza od Słońca planeta w Układzie Słonecznym, czwarta pod względem średnicy i trzecia pod względem masy", "assets/neptune.jpg", "Neptun", 8 });

            migrationBuilder.InsertData(
                table: "Planets",
                columns: new[] { "Id", "Description", "ImagePath", "Name", "PlanetNumber" },
                values: new object[] { 5, "Czwarta od Słońca planeta Układu Słonecznego.", "assets/mars.jpg", "Mars", 4 });

            migrationBuilder.InsertData(
                table: "Planets",
                columns: new[] { "Id", "Description", "ImagePath", "Name", "PlanetNumber" },
                values: new object[] { 6, "Piąta w kolejności od Słońca i największa planeta Układu Słonecznego", "assets/jupiter.jpg", "Jowisz", 5 });

            migrationBuilder.InsertData(
                table: "Planets",
                columns: new[] { "Id", "Description", "ImagePath", "Name", "PlanetNumber" },
                values: new object[] { 7, "Szósta planeta Układu Słonecznego pod względem odległości od Słońca, druga po Jowiszu pod względem masy i wielkości", "assets/saturn.jpg", "Saturn", 6 });

            migrationBuilder.InsertData(
                table: "Planets",
                columns: new[] { "Id", "Description", "ImagePath", "Name", "PlanetNumber" },
                values: new object[] { 8, "Siódma od Słońca planeta Układu Słonecznego, trzecia pod względem wielkości i czwarta pod względem masy.", "assets/uranus.jpg", "Uran", 7 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Planets");
        }
    }
}

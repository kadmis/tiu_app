export class PlanetFilters {
    planetName: string;
    planetNumberFrom: number;
    planetNumberTo: number;
    orderBy: string;
    order: string;

    constructor() {
        this.orderBy = "name";
        this.order = "asc";
    }

    userId: number;
}

from collections import defaultdict

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.city import City
from app.models.road import Road
from app.schemas.route import RouteRequest
from app.services.dijkstra import dijkstra

router = APIRouter(
    prefix="/route",
    tags=["Route"],
)


@router.post("/")
def find_shortest_route(
    request: RouteRequest,
    db: Session = Depends(get_db),
):

    source = db.query(City).filter(
        City.id == request.source_city_id
    ).first()

    destination = db.query(City).filter(
        City.id == request.destination_city_id
    ).first()

    if not source or not destination:
        raise HTTPException(
            status_code=404,
            detail="City not found",
        )

    roads = db.query(Road).all()

    graph = defaultdict(list)

    for road in roads:

        graph[road.source_city_id].append(
            (
                road.destination_city_id,
                road.distance,
            )
        )

        if road.is_bidirectional:

            graph[road.destination_city_id].append(
                (
                    road.source_city_id,
                    road.distance,
                )
            )

    result = dijkstra(
        graph,
        request.source_city_id,
        request.destination_city_id,
    )

    if result is None:

        raise HTTPException(
            status_code=404,
            detail="No route found",
        )

    distance, path = result

    city_names = []

    for city_id in path:

        city = db.query(City).filter(
            City.id == city_id
        ).first()

        city_names.append(city.name)

    return {
        "distance": distance,
        "path": city_names,
    }
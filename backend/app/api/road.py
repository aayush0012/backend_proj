from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.city import City
from app.models.road import Road
from app.schemas.road import RoadCreate

router = APIRouter(
    prefix="/roads",
    tags=["Roads"],
)


@router.post("/")
def create_road(
    road: RoadCreate,
    db: Session = Depends(get_db),
):

    source = db.query(City).filter(
        City.id == road.source_city_id
    ).first()

    destination = db.query(City).filter(
        City.id == road.destination_city_id
    ).first()

    if not source or not destination:
        raise HTTPException(
            status_code=404,
            detail="Invalid city id",
        )

    new_road = Road(
        source_city_id=road.source_city_id,
        destination_city_id=road.destination_city_id,
        distance=road.distance,
        is_bidirectional=road.is_bidirectional,
    )

    db.add(new_road)
    db.commit()
    db.refresh(new_road)

    return new_road


@router.get("/")
def get_all_roads(
    db: Session = Depends(get_db),
):
    return db.query(Road).all()


@router.delete("/{road_id}")
def delete_road(
    road_id: int,
    db: Session = Depends(get_db),
):

    road = db.query(Road).filter(
        Road.id == road_id
    ).first()

    if not road:
        raise HTTPException(
            status_code=404,
            detail="Road not found",
        )

    db.delete(road)
    db.commit()

    return {
        "message": "Road deleted successfully"
    }
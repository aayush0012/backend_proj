from pydantic import BaseModel


class RoadCreate(BaseModel):
    source_city_id: int
    destination_city_id: int
    distance: int
    is_bidirectional: bool = True


class RoadResponse(BaseModel):
    id: int
    source_city_id: int
    destination_city_id: int
    distance: int
    is_bidirectional: bool

    class Config:
        from_attributes = True
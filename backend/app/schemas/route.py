from pydantic import BaseModel


class RouteRequest(BaseModel):
    source_city_id: int
    destination_city_id: int
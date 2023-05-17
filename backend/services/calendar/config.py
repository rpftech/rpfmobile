from pydantic import BaseModel

APP_NAME = "RPF"


class ConfigEnv(BaseModel):
    api_key: str
    url: str
    appointments_service_id: str


class ConfigAppName(BaseModel):
    app_name: str


class Config(ConfigEnv, ConfigAppName):
    pass


TEST_CONFIG = ConfigEnv(
    api_key="5bdf48784c057dceaa9e63173d7cbc91edbcdade",
    url="https://rpf.test.makeplans.net/api/v1",
    appointments_service_id="2079",
)

PROD_CONFIG = ConfigEnv(
    api_key="d29209e1dfa420e909770066f70e59b25b5c851b",
    url="https://rpf.makeplans.com/api/v1",
    appointments_service_id="24442",
)

_ENV_CONFIG = TEST_CONFIG

combined_config = Config(**_ENV_CONFIG.dict(), app_name=APP_NAME)

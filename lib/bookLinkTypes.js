export const bookLinkTypes = (id) => {
  return {
    "en-GB": {
      amazon: `https://www.amazon.co.uk/s?k=${id}`,
      waterstones: `https://www.waterstones.com/books/search/term/${id}`,
    },
    "en-US": {
      amazon: `https://www.amazon.com/s?k=${id}`,
    },
  };
};

export const bookShopLogos = {
  amazon:
    "https://iconarchive.com/download/i80413/uiconstock/socialmedia/Amazon.ico",
  waterstones:
    "https://res-2.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1418983427/gq575yq9edwui1w6zd8m.png",
  whsmith:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEuUlEQVRYhb2Xe0zVZRjHP+/vB+fCATyHm4fDHRSRiyyFmhaYgiOXkcMyl65Ya+XU1lr903RpVqtm/VNbbs1qtbW8MOfU1HROhUkuvCSgCCiXuAlyuB3kHDiXX38cJHXB75diz7/v8z7fz/u+z/u8zytEwfYSBb4RQszkfzQFpUsobJJJWXJSCGGdzFEXKPPBunzio2Zwuakbs0nPwvRYWroHmR0TxurF6Tw+x0ZeVjw1zT2EGPVsWfsUETOCuNbWi6L8e1yBCFEE+ZJARE9FOub2UlXfSXxUKACzbGFsKM4BoN/h5PC5RhzOMcbcXoZdbuwOJyaDjtbuQby+SdT/gYiWpvQYt/KaVvKz4idEdQEyVkswVksw7b1DAFjDg8lIiCQjIZKwUCPKZEu/zzQBDI2MYR9ykhYXzsioh7LyOl7Mn4vH65vwcbo89Dtc9DtcuMY8msQ1AwAcrbrBq8vm0dU/zKFzjTy/KPUeoYHbLjr7HHT2ObjtciOmG+BY1XX6h10TYucbuujoc2AIlEmOtpBoNROkD8RsMmC1mMhIjEKW1DGEKPxI22EBugAZIWBJdiILUqPx+nz0DIxwtraN5pv9eLwKQkCoUc/IqJtRj1c1puYdAFiVl8a1HzawKi+N+jY7Fxq6CJQlvtpYxPfvFRMWYsDnUzj8yRpkWVvoAK3iG4tz+GJ9IcVb9nDiYvNdI818++tFVuXN5einL7PryCXmxIVrXpQmgCSrmc9eX8r+imv3iftNAcoq6vB4fZRtfYGhkVHNAJr2aV1BFiajjsor7VP6HaisZ/epK5rFNQPkzPEXy2CjTtV3x97f8d5VH6YFwKgPBGBtQSaBKslV3dTN2dq26a2Eje12ADKTovhy/bIp77cCrNy2D6fGaqgJ4Mgf1/2RgU0rcznw4WqSrGZNAmomi+Sl29Scmm8OUJSbTEyE/0VMjQ3nzRXziY0MobG9D7vD+WgBfIrC6cutFC9MxRxsACBAlshJtfHGs/PJTplJe4+DjvGXcdoBAPocLsrK60iLiyAlxoIQ/jyQZYn0hEhKi+axKCOO+rZeOu3D0w8A4HCO8cupWi423GSWLYyYiJCJMUkIUmwWSouyMeoCOV3dOmk39MAAd6yho4/vjl7iTHUrM4IMJEdbJmq/LEnkZcUTbNBx/ELTowG4Yy3dg+w5c5W9p68SGqQnIzESafyK5qbZOFZ1g067Y8oY/+k1nMwaOvoo3XGQFZt3Yx/y34gAWeK1omzVuaoAkhDs3lyiWgEBjl9oomTrXtzjfcDC9NiHBxBA4fwkUmwW1WAAFbVtHKxsACDKbHp4AABJEizPnaUJAOBcXQcALrd6OdacA6XPZBOgoccD//kDXGm5NX0AmYmRlGpIKoDF8+JRFIWfT9ZMH8BvVTfY+spiFqkk1vLcFJYtSObUny3sK69TjaupJfN4fbyz8wShQTp2vfscOw+d58fj1fc8uboAiTVPZ/L1W0VU1PzFSx/vV/2aAQgKt3dO9T8UAt5f8ySf76nE61Mwm/S8XfIEBY8l0t7r4NbACGGhBhbMjsY56mHnofP8dKKaMY96V6SgdIkH/Z5LQmALD8Go92/i4LCLnsERzfPvfM//BsLgtnA/2ZaAAAAAAElFTkSuQmCC",
};

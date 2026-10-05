(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.ElyseanDelivery = api;
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';

  const zones = Object.freeze([
    Object.freeze({
      code: 'COLLECTION',
      name: 'Free collection in George',
      customerChargeCents: 0,
      method: 'collection',
      schedule: 'Collection is arranged directly after your order is ready. No Sunday collections.',
    }),
    Object.freeze({
      code: 'ZONE_1',
      name: 'Zone 1 — George local delivery',
      customerChargeCents: 7900,
      method: 'local_delivery',
      schedule: 'Weekday delivery after 17:00, or Saturday and selected public-holiday delivery before 13:00. No Sunday delivery.',
    }),
    Object.freeze({
      code: 'ZONE_2',
      name: 'Zone 2 — Extended local delivery',
      customerChargeCents: 9900,
      method: 'scheduled_route',
      schedule: 'Delivered on a scheduled Saturday or selected public-holiday route before 13:00. No Sunday delivery.',
    }),
    Object.freeze({
      code: 'ZONE_3',
      name: 'Zone 3 — Mossel Bay or Knysna route',
      customerChargeCents: 15900,
      method: 'scheduled_route',
      schedule: 'Delivered on a scheduled Saturday or selected public-holiday route before 13:00. No Sunday delivery.',
    }),
  ]);

  const areas = Object.freeze([
    Object.freeze({ id: 'collection-george', name: 'Collect in George (arranged after preparation)', zoneCode: 'COLLECTION' }),
    Object.freeze({ id: 'george', name: 'George and immediate suburbs', zoneCode: 'ZONE_1' }),
    Object.freeze({ id: 'blanco', name: 'Blanco', zoneCode: 'ZONE_1' }),
    Object.freeze({ id: 'pacaltsdorp', name: 'Pacaltsdorp', zoneCode: 'ZONE_1' }),
    Object.freeze({ id: 'victoria-bay', name: 'Victoria Bay', zoneCode: 'ZONE_2' }),
    Object.freeze({ id: 'wilderness', name: 'Wilderness', zoneCode: 'ZONE_2' }),
    Object.freeze({ id: 'herolds-bay', name: 'Herolds Bay', zoneCode: 'ZONE_2' }),
    Object.freeze({ id: 'glentana', name: 'Glentana / Outeniqua Strand', zoneCode: 'ZONE_2' }),
    Object.freeze({ id: 'groot-brak', name: 'Groot Brakrivier area', zoneCode: 'ZONE_2' }),
    Object.freeze({ id: 'klein-brak', name: 'Klein Brakrivier / Reebok / Tergniet', zoneCode: 'ZONE_2' }),
    Object.freeze({ id: 'sedgefield', name: 'Sedgefield area', zoneCode: 'ZONE_2' }),
    Object.freeze({ id: 'hartenbos', name: 'Hartenbos area', zoneCode: 'ZONE_3' }),
    Object.freeze({ id: 'mossel-bay', name: 'Mossel Bay area', zoneCode: 'ZONE_3' }),
    Object.freeze({ id: 'dana-bay', name: 'Dana Bay', zoneCode: 'ZONE_3' }),
    Object.freeze({ id: 'knysna', name: 'Knysna and immediate suburbs', zoneCode: 'ZONE_3' }),
  ]);

  const zonesByCode = new Map(zones.map((zone) => [zone.code, zone]));
  const areasById = new Map(areas.map((area) => [area.id, area]));

  function getArea(areaId) {
    const area = areasById.get(String(areaId || '').trim());
    if (!area) return null;
    const zone = zonesByCode.get(area.zoneCode);
    return zone ? { ...area, zone } : null;
  }

  function quote(areaId) {
    const match = getArea(areaId);
    if (!match) throw new Error('Please choose a delivery area');
    return {
      areaId: match.id,
      areaName: match.name,
      zoneCode: match.zone.code,
      zoneName: match.zone.name,
      method: match.zone.method,
      schedule: match.zone.schedule,
      customerChargeCents: match.zone.customerChargeCents,
    };
  }

  function publicConfig() {
    return {
      zones: zones.map((zone) => ({ ...zone })),
      areas: areas.map((area) => ({ ...area })),
    };
  }

  return Object.freeze({ zones, areas, getArea, quote, publicConfig });
});

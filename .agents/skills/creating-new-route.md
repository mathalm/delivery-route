---
name: creating-new-route
description: It's detailed instruictions of how create a new route and add it on the project
---

# My Skill

To create a new route, we need to follow some rules. All locations have `id`, `name`, `lgn` and `lat`.
Example: `{ id: 2, name: "Central Park", lng: -73.9654, lat: 40.7829 }`

## When to Use

- Use this skill when the user ask to create a new location. You need o ask for the 4 important information.
- This skill is helpful for create a new location.

## Instructions

- First you need to check how the location works on this path: `/home/MATHEUS.DEALMEIDA/studies/delivery-route/components/location.ts`
- After check, you must to ask to user the information about the route
- If the user don't know the Latitude and Longitude, first seach for that, if you don't find it, ask for him search on this site `https://www.latlong.net/convert-address-to-lat-long.html`
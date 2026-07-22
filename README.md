# FG Kids Project! — Website

Static HTML/CSS site, folder-based routing (same approach as the Spatial Apex build).

## Structure
```
/index.html                          Home
/ourkidsneedus/index.html                  Our Why
/nutritionsteamlab/index.html                STEAM Labs
/spatial-computing/index.html         Spatial Computing (hub)
/spatial-computing/digital-link/      What Is a Digital Link?
/spatial-computing/spatial-anchors/   What Are Spatial Anchors?
/spatial-computing/hardware/          Meet the Hardware
/partnerwithus/index.html              Get Involved (partnerships + FAQ)
/donate/index.html                    Donate (Zeffy embed)
/css/styles.css                       Design system
/js/site.js                           Mobile nav + FAQ accordion
```

## Deploying to Netlify
1. Drag the whole folder into Netlify's "Deploys" tab (or connect a GitHub repo and push this folder).
2. No build command needed — it's plain static HTML. Set the publish directory to the site root (`/`).
3. Once deployed, go to **Domain settings > Add a domain** and add your domain (referenced in the manual as `fgkidsproject.com`).
4. Netlify will give you DNS records to add at your registrar:
   - Either point your registrar's nameservers to Netlify, **or**
   - Add an `A` record for the root domain to Netlify's load balancer IP, plus a `CNAME` for `www` pointing to your Netlify site's `.netlify.app` address.
   Netlify's own domain settings page shows the exact current values to use — copy those directly rather than reusing old records.
5. HTTPS certificate provisions automatically once DNS resolves.

## Pages
Now 10 pages — added `/scratch-nutrition-lab/` (public press/blog-style page on the Evans High School partnership). Linked from the Home and STEAM Labs pilot sections; not in the top nav (add it there if you want).

## Before going live — things to swap in
- [x] Product/brand + spatial-computing imagery placed across Home, Our Why, STEAM Labs, Spatial Computing, and the new Evans page
- [ ] The 3 recipe-teaser photos on the STEAM Labs page are still `[Photo: ...]` placeholders — they need real dish photography and the recipes are illustrative (will change for the Evans pilot), so they were intentionally left
- [ ] Real logo files (currently a simple text/CSS mark — "FG Kids" in the nav)
- [ ] Confirm the Zeffy embed on `/donate/` renders correctly — grab the exact embed snippet from Zeffy's own "Share > Embed" panel if the current iframe URL doesn't work, and swap it in (marked with an HTML comment in `donate/index.html`)
- [ ] Confirm `partner@fgkidsproject.com` and `hello@fgkidsproject.com` are real addresses, or swap for the ones you actually use
- [ ] Recipes on the STEAM Labs page are illustrative — swap once the Evans-specific recipe list is finalized

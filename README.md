# Stage Screen

A tool for displaying information and interstitial content at events,
specifically developed for [Electromagnetic Field](https://emfcamp.org),
but it would probably work in other places.

## Demo

To see how it works follow these steps:

1. Go to http://infinite-headland-30673.herokuapp.com/ - you'll see a screen
   telling you a display ID.

2. In another window, open http://infinite-headland-30673.herokuapp.com/admin/displays,
   find your display, then give it a name and location. Switch the view mode to "Stage"
   since the other ones aren't yet implemented.

Your display window should now be showing the location details you put in, and
some assorted EMF-y content. This content is selected at random from the pool at
http://infinite-headland-30673.herokuapp.com/admin/contents - feel free to add more.

## Supported Content Types

No content is stored locally, we're just pulling it in from URLs provided. This is
probably a terrible idea and will need to be fixed to avoid someone Goatse-ing a
stage, but it'll do for now.

* *Image:* Drop in a URL for an image. Nothing more to it.
* *YouTube:* On a YouTube video click the Share button, and copy the URL provided.
* *Video:* Use the URL for the actual video, anything supported by an HTML video tag
           is supported here.

# TODO

* [ ] Remove the code in ScheduleController#show with a hardcoded time
* [ ] Make it pretty! Branding etc.
* [x] Self-registration of displays
* [x] Websocket based control of displays
* [x] Play YouTube videos
* [x] Display images
* [x] Play arbitrary videos from the internet
* [x] Display messages/notices from a pool
* [ ] Display messages/notices on demand
* [x] Now/next view
* [ ] Schedule view (needs working out how to do it)
* [ ] Volunteers view - volunteers needed etc
* [ ] Bar view - current stock, prices, etc
* [ ] Info desk view - schedule, village information, assorted notices
* [ ] Stage view - know which stage a display is in, and show information
      about what's happening there
* [x] Content tagging
* [ ] Limit specific displays to a list of tagged content
* [ ] Timed content (do not display after/before specific times)
* [ ] Random view - NOC stats, etc
* [ ] Smoother content transitions - find some way to load content in the
      background, only displaying it once its been fully loaded.

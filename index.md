---
layout: default
title: Dustin
---

WELCOME
=======

Blog Posts
----------
* {% for post in site.posts %}
    * <span>{{ post.date | date_to_string }} </span> &raquo; [{{ post.title }}]({{ post.url }})
  {% endfor %}



[BAD LINK](/badstuff)


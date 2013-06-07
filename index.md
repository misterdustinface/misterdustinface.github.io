---
layout: default
title: Dustin
---

WELCOME
=======

Blog Posts
----------
  {% for post in site.posts %}
    {{ post.date | date_to_string }}  &raquo; [{{ post.title }}]({{ post.url }})
  {% endfor %}

[BAD LINK](/badstuff)

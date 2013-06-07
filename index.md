---
layout: default
title: Dustin
---

WELCOME
=======

<a href="/">MROW</a>

Blog Posts
----------
  {% for post in site.posts %}
    {{ post.date | date_to_string }} ~ [{{ post.title }}]({{ post.url }})
  {% endfor %}

[BAD LINK](/badstuff)

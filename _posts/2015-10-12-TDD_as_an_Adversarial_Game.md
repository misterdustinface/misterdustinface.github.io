---
layout: post
title:  TDD as an Adversarial Game
---

{{ page.title }}
================

---

TDD plays like a game when used with Pair Programming.

We play on System X.

1. Player 1 attempts to write a test that will fail given the current state of System X.
2. Player 2 attempts to fix System X in correspondence to this new failure.
3. Repeat.

Player 1 is the attacker, Player 2 is the defender.

The individual attacks are small, but they keep the defender busy.

The defender tries to patch System X with as little work as possible - to avoid failing old tests, and to catch up with the wrath of the attacker.

How does 'work as a game' effect a pair programming team?

* Both individuals will remain cognitively engaged.  They are playing a strategy game.
* Both individuals will sync to the same work/break schedule.  They will be forced to interact with each other frequently, so they will end up taking breaks when at least one of them is tired, and will attempt to work together when they are both in the best shape to do so.
* Both individuals will understand the changes made to System X, and why they were made.  Player 1 found a way to break the system, and Player 2 found a way to patch it - and they were both present for this.
* Both individuals will stay on their assigned task.  Moves will be short and directed, so no Player(s) should stray too far offcourse during the game (unless they are both tired, ambitious, forgetful, or some combination of the set).  Most programmers are lazy by nature (they like to do as little work as possible to accomplish a task), so they will enjoy the short, directed nature of the game moves, and thus be forced into completing their task, as opposed to conjuring up new tasks while falling off-track.

---


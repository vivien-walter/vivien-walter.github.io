---
title: "Teaching"
permalink: /teaching/
author_profile: false
sidebar:
  nav: "sidebar-teaching"
header:
  overlay_image: /assets/images/header-teaching.png
  overlay_filter: 0.5
  caption: "Source: [PhD thesis cover](/publications/phd-thesis/)"
---

You can find on this page a collection of all the <b>tutorials</b> and <b>lessons</b> I have
created myself over time. All the materials are available for download as <b>pdf files</b>.

<b>Important:</b> uploading all the tutorials and lessons I have made so far will take a long time.
If the chapter or tutorial you are interested in has not been uploaded yet, please come back later or contact me.
{: .notice--warning}

<h2> Tutorials </h2>

Tutorials are <b>step by step guides</b> dealing with programming languages (<i>e.g.</i> Python, LabVIEW) or softwares (<i>e.g.</i> ImageJ).
Unlike a lesson which has a set syllabus, the tutorials will likely evolve over time and more materials will be added continuously.

<h3 id='teaching-python'> Python </h3>

{% assign python = site.teaching | where:"title", "Python for Data Analysis"  | first %}
{{ python.content }}

<h3 id='teaching-labview'> LabVIEW </h3>

{% assign labview = site.teaching | where:"title", "Getting started in LabVIEW"  | first %}
{{ labview.content }}

<h2> Lessons </h2>

Lessons are lengthy <b>explanations</b> and <b>demonstrations</b> on a selected topic. Unlike the tutorials,
the lessons will explore the different subjects in depth to explain all the details.

<h3 id='teaching-stats'> Statistics </h3>

{% assign stats = site.teaching | where:"title", "Advanced statistics"  | first %}
{{ stats.excerpt }}

<a href="{{ stats.url }}" class="btn btn--success"><b>READ THE TUTORIAL</b></a>

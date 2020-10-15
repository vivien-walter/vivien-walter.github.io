---
title: "HPyMon"
language: "python"
slug: "2-hpymon"
navslug: "hpymon"
github-enable: true
github-link: "https://github.com/vivien-walter/hpymon"
version: beta
release: 2020
python-version: 3
support: true
excerpt_separator: <!--more-->
tagline: "GUI Job Monitor on HPC"
header:
  overlay_image: /assets/images/header-software.jpg
  caption: "Source: Codelines of MLLPA"
toc: true
toc_sticky: true
---

<img src="https://img.shields.io/badge/version-{{ page.version }}-f39f37">
<img src="https://img.shields.io/badge/release-{{ page.release }}-0377fc">
<img src="https://img.shields.io/badge/python-{{ page.python-version }}-3b9c46">
<img src="https://img.shields.io/badge/support-{{ page.support }}-8c8c8c">

HPyMon is a Python software running with a GUI that is used to **collect jobs on a distant HPC** and display the list in a **user-friendly** interface.
The software includes many options, such as generation of custom displays of the job list and basic commands that can be send to the servers.

<!--more-->

<center><img src="https://github.com/vivien-walter/hpymon/blob/main/sources/main/icons/linux/256.png?raw=true" width='200' height='200'/></center>
<center><sub>Logo of HPyMon.</sub></center>

## Presentation

HPyMon is a complete **Python 3 software** - no terminal lines required and provided with its own executable - used to connect to a HPC server and
collect the **list of running jobs** there. HPyMon then display the list of job in its table interface to make it convenient to read for
the user. The graphic user interface (GUI) of HPyMon is powered by **PyQt5**.

<center><img src="https://github.com/vivien-walter/hpymon/blob/main/sources/main/resources/base/help/main.png?raw=true" width='600' height='600'/></center>
<center><sub>Main interface of HPyMon with displayed jobs.</sub></center>
<br>

HPyMon includes tools to connect to a distant server by **tunnelling** through another server. It is also possible to **kill selected job(s)** in HPyMon.

## Installation

The **documentation** on how to install and launch the software can be found on the related [GitHub page](https://github.com/vivien-walter/hpymon).

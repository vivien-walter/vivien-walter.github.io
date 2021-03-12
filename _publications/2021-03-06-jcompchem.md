---
title: "MLLPA: A Machine Learning‐assisted Python module to study phase‐specific events in lipid membranes"
short-author: "Walter et al."
short-journal: "J Comp Chem"
short-ref: ""
slug: "2021-03-06-jcompchem"
year: 2021
thesis: false
published-date: 2021-03-06
tags:
  - md simulations
  - gromacs
  - machine learning
tagline: "**2021** *Journal of Computational Chemistry*"
header:
  overlay_image: /assets/images/header-publications.png
  caption: "Source: Paper being checked before submission"
  actions:
    - label: "See on the website"
      url: "https://onlinelibrary.wiley.com/doi/abs/10.1002/jcc.26508"
toc: true
toc_sticky: true
---

## Abstact

Machine Learning‐assisted Lipid Phase Analysis (MLLPA) is a new Python 3 module developed to analyze phase domains in a lipid membrane based on lipid molecular states. Reading standard simulation coordinate and trajectory files, the software first analyze the phase composition of the lipid membrane by using machine learning tools to label each individual molecules with respect to their state, and then decompose the simulation box using Voronoi tessellations to analyze the local environment of all the molecules of interest. MLLPA is versatile as it can read from multiple format (e.g., GROMACS, LAMMPS) and from either all‐atom (e.g., CHARMM36) or coarse‐grain models (e.g., Martini). It can also analyze multiple geometries of membranes (e.g., bilayers, vesicles). Finally, the software allows for training with more than two phases, allowing for multiple phase coexistence analysis.

{% capture abstract_img %}
![abstract]({{ site.baseurl }}/assets/images/publications/abstract_jcompchem_2021.png){: .align-center}
{% endcapture %}

<figure>
  {{ abstract_img | markdownify | remove: "<p>" | remove: "</p>" }}
  <figcaption>Mapping a lipid membrane by phase prediction.</figcaption>
</figure>

## Author(s) & Affilation(s)

Vivien Walter<sup>1</sup>, Celine Ruscher<sup>2</sup>, Olivier Benzerara<sup>2</sup>, Fabrice Thalmann<sup>2</sup>

1. Department of Chemistry, King's College London, Britannia House, 7 Trinity Street, London, UK
2. Institut Charles Sadron, CNRS and University of Strasbourg, 23 rue du Loess, F-67034 Strasbourg, France

## Cite this publication

> Walter et al., MLLPA: A Machine Learning‐assisted Python module to study phase‐specific events in lipid membranes, *J. Comp. Chem.* **2021**

You can access the publication directly on [this link](https://onlinelibrary.wiley.com/doi/abs/10.1002/jcc.26508).

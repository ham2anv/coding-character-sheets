---
title: "Tool: Encounter Tables"
date: 2022-07-11 11:07:26-04:00
excerpt: A tool for creating clickable tables that process inline dice rolls
 when selecting an entry.
---

Previously, I detailed a couple tools for your games: [inline dice rolls] (and
its [advanced update]) and [random tables]. That's two great tastes that taste
great together. We can combine these two tools to create a new way to present
an old idea: the random encounter table.

You can grab the code for this tool at [GitHub]. I'm not going to break it down
here as it basically just combines the JavaScript and CSS from the two older
tools. 

To use the tool, set up a table just as you did with the original [random
tables] tool. It can use the `data-weighted` and `data-weight` custom data
attributes if you need them. In the example code here, I included a class
`scale` that uses the CSS `transform` property to make the rolled entry "pop"
a little to draw the eye, but this is optional and dependent on your visual
design.

Inside each entry, you can include any number of `span` elements with the
`dice-roll` class to indicate inline dice rolls as with the original tool. The
example code uses the full suite of options from the [advanced update].

When the user clicks your table, it randomly selects an entry. If that entry has
any inline dice rolls, they are rolled and the result overlayed on the dice
notation. (To produce a cleaner experience, clicking a dice notation directly
won't roll the dice, but it will trigger a random selection from the table.)

Clicking to select another random entry will clear any inline dice results, as
will clicking on the selected entry to clear the table.

And now, I'll leave you with an example encounter table that selects a random
Level 1 dungeon encounter for 3.5-edition fantasy:

<table id="random-encounter-1" data-weighted="true">
    <thead>
        <tr><th class="text-center">d%</th><th>Encounter</th></tr>
    </thead>
    <tbody>
        <tr data-weight="3">  <td>01–03</td>   <td class="scale"><span class="dice-roll">1d3</span> Medium monstrous centipedes (vermin)</td></tr>
        <tr data-weight="5">  <td>04–08</td>   <td class="scale"><span class="dice-roll">1d4</span> dire rats</td></tr>
        <tr data-weight="2">  <td>09–10</td>   <td class="scale"><span class="dice-roll">1d4</span> giant fire beetles (vermin)</td></tr>
        <tr data-weight="3">  <td>11–13</td>   <td class="scale"><span class="dice-roll">1d3</span> Small monstrous scorpions (vermin)</td></tr>
        <tr data-weight="3">  <td>14–16</td>   <td class="scale"><span class="dice-roll">1d3</span> Small monstrous spiders (vermin)</td></tr>
        <tr data-weight="4">  <td>17–20</td>   <td class="scale"><span class="dice-roll">1d3</span> dwarf warriors</td></tr>
        <tr data-weight="2">  <td>21–22</td>   <td class="scale"><span class="dice-roll">1d3</span> elf warriors</td></tr>
        <tr data-weight="3">  <td>23–25</td>   <td class="scale">1 darkmantle</td></tr>
        <tr data-weight="3">  <td>26–28</td>   <td class="scale">1 krenshar</td></tr>
        <tr data-weight="2">  <td>29–30</td>   <td class="scale">1 lemure (devil)</td></tr>
        <tr data-weight="10"> <td>31–40</td>   <td class="scale"><span class="dice-roll">1d3+1</span> goblin warriors</td></tr>
        <tr data-weight="10"> <td>41–50</td>   <td class="scale"><span class="dice-roll">1d4+2</span> kobold warriors</td></tr>
        <tr data-weight="6">  <td>51–56</td>   <td class="scale"><span class="dice-roll">1d4</span> human warrior skeletons</td></tr>
        <tr data-weight="6">  <td>57–62</td>   <td class="scale"><span class="dice-roll">1d3</span> human commoner zombies</td></tr>
        <tr data-weight="9">  <td>63–71</td>   <td class="scale"><span class="dice-roll">1d4+1</span> Tiny viper snakes (animal)</td></tr>
        <tr data-weight="9">  <td>72–80</td>   <td class="scale"><span class="dice-roll">1d3</span> orc warriors</td></tr>
        <tr data-weight="5">  <td>81–85</td>   <td class="scale"><span class="dice-roll">1d3</span> stirges</td></tr>
        <tr data-weight="5">  <td>86–90</td>   <td class="scale">1 spider swarm</td></tr>
        <tr data-weight="10"> <td>91–100</td>  <td class="scale">Roll on 2nd-level table</td></tr>
    </tbody>
</table>


<!-- Links & References -->
[inline dice rolls]: /posts/dice-roll/
[advanced update]: /posts/dice-roll-adv/
[random tables]: /posts/random-tables/
[GitHub]: https://github.com/ham2anv/coding-character-sheets/tree/main/examples/encounter-tables

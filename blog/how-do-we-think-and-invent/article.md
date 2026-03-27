---
title: How Do We Think, and How Do We Invent?
description: Let's explore whether creativity can be modeled without losing what makes it human, and whether that is the next frontier for AI models.
date: 2026-03-25
tags: thinking, creativity, model design
slug: how-do-we-think-and-invent
kicker: Essay
math: true
---


## Abstract

Have you ever thought about how theoretical physicists made bold claims throughout 
history without having proper references? And later, they showed
that those seemingly wild ideas held up through experimentation. I will explain
what I mean using a few examples.

Take Albert Einstein, for example, who came up with the idea of time dilation
in the Special Theory of Relativity [1]. How did he ever arrive at that? Isn't
it fascinating to think about how the theory first struck his mind? Or how
Archimedes came up with buoyancy [2]? He might have been daydreaming about
possible solutions, but believe me or not, arriving at such an idea without
prior information is really fascinating.

Quantifying the abstract idea of thought and the process of thinking would help
us design the next frontier of AI architecture.


## A rudimentary way to frame invention

A useful starting point is to treat invention as a function of memory,
abstraction, analogy, constraint, and taste. I am not claiming this is *the*
equation. I am saying it is a good way to reason about the problem.

$$
\text{invention} \approx f(\text{memory},\; \text{abstraction},\; \text{analogy},\; \text{constraint},\; \text{taste})
$$

Memory matters because nothing new is created from nothing. Abstraction matters
because raw facts are not enough; we need compressed forms that transfer across
domains. Analogy matters because many useful inventions are really clean
mappings between two things that previously looked unrelated. Constraint matters
because useful solutions are shaped by budgets, hardware, time, and the
messiness of the real world. Taste matters because not every valid combination
is interesting.


## Invention: Using an example

Let's take an example. In the 20th century, researchers found that stem cells
can differentiate into different cell types [3]. That does not automatically
mean immortality, but it does suggest how powerful a new research direction can
be once we understand how to repair or replace the right cells.

Now let's frame an equation with the information we have.
$$
y = \left\{
    (m_{1_a} \; + \; m_{1_b} \; + \; \ldots)x_1^{n_1} \; + \;\ldots 
    \; + \;
    (W_{1_a} \; + \; W_{1_b} \; + \; \ldots)C_1^{z_1}
    \right\}
    \left\{
    O_1^{l_1} \; + \; O_1^{l_1} \; + \; \ldots
    \right\}
$$

Now the equation might look scary for some people, but believe me, it's not. I
actually modified our high-school equation $y = mx + c$.

Now let's explore the *not-so-pretty* equation. Here:
$$

\begin{aligned}

&y = \text{new idea, which here can be stem cell research} \\
&m_1 = \text{each aspect of importance for a particular known piece of information} \\
&x_1 = \text{known information to us. Example: human anatomy} \\
&W_1 = \text{boundary condition for the constraints} \\
&C_1 = \text{Constraint. Example: we can't kill humans} \\
&O_1 = \text{Objective. Example: eliminate hunger} \\
&O_2 = \text{Objective. Example: organ transplant} \\
% &\left[(m_{1_a} \; + \; m_{1_b} \; + \; \ldots)x_1^{n_1} \; + \; \ldots \right]
% = \text{all the important previously known information}

\end{aligned}

$$

That basically means that our idea of pursuing *stem cell research* to solve a
few problems, like organ failure and cancer, came from prior needs, along with
a few boundary conditions, such as not killing humans or animals.


## What current AI models are already good at

Present-generation models are already strong at recall, recombination, and
compression. They can pull patterns out of large corpora, summarize them, and
produce plausible continuations. These models, which are most likely based on
*Transformers*, are, in simple language, word predictors.

Present-generation AI really feels intelligent and might give you the strong
illusion that it can think. As of now, if I give any AI model the task of
generating the next big idea in physics or organic chemistry, I do not think it
will be able to do that.

That's where we have to understand the difference between present-gen AI and
us.


## Idea-As-A-Token

This is a term I coined, but I will explain it here. Taking my previous
examples as reference, the quanta of information in our brain seem closer to
ideas than to raw words. That feels like a higher-order representation compared
to present-generation tokens, or combinations of alphabets.

Now we combine and juggle ideas to create something new, while present-gen AI
models combine and juggle tokens to form the most meaningful sentence or
paragraph. So we are operating in an altogether different league, or at least a
different representational space.

We might blame everything on the present-gen silicon-based compute units, but I
believe it's also an algorithmic limitation.


## Where I would push next

The backbone of our AI is backpropagation, and I love it. But I also think it's
not giving us the complete picture of how humans think. I will keep researching
this topic and see if something comes up. I will also update my progress here.


## References:

1. Albert Einstein, [*On the Electrodynamics of Moving Bodies*](https://www.fourmilab.ch/etexts/einstein/specrel/specrel.pdf).
2. Encyclopaedia Britannica, [*Archimedes' principle*](https://www.britannica.com/science/Archimedes-principle).
3. Irving L. Weissman and Judith A. Shizuru, [*The origins of the identification and isolation of hematopoietic stem cells, and their capability to induce donor-specific transplantation tolerance and treat autoimmune diseases*](https://pmc.ncbi.nlm.nih.gov/articles/PMC2574516/).

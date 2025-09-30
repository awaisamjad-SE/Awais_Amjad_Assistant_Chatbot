# (Full code — same as executed above)
# - Supports operators: |  * + ? and implicit concatenation
# - Change regex = "(a|b)*abb" to any regex you want to visualize.

import matplotlib.pyplot as plt
from matplotlib.patches import FancyArrowPatch, Circle
import pandas as pd
import math

def is_symbol(ch):
    return ch not in set(['|', '*', '+', '?', '(', ')'])

def add_concat(regex):
    """Insert explicit concatenation operator '.' where needed."""
    result = []
    prev = None
    for ch in regex:
        if prev is None:
            result.append(ch)
        else:
            # insert concat when previous is symbol, ')' or closure, and current is symbol or '('
            if (is_symbol(prev) or prev == ')' or prev in ['*','+','?']) and (is_symbol(ch) or ch == '('):
                result.append('.')
            result.append(ch)
        prev = ch
    return ''.join(result)

def to_postfix(regex):
    prec = {'*': 4, '+': 4, '?': 4, '.': 3, '|': 2}
    output = []
    stack = []
    for ch in regex:
        if ch == '(':
            stack.append(ch)
        elif ch == ')':
            while stack and stack[-1] != '(':
                output.append(stack.pop())
            stack.pop()
        elif ch in prec:
            while stack and stack[-1] != '(' and prec.get(stack[-1],0) >= prec[ch]:
                output.append(stack.pop())
            stack.append(ch)
        else:
            output.append(ch)
    while stack:
        output.append(stack.pop())
    return ''.join(output)

class Fragment:
    def _init_(self, start, accept):
        self.start = start
        self.accept = accept

def thompson(postfix):
    next_state = 0
    def new_state():
        nonlocal next_state
        s = next_state
        next_state += 1
        return s

    stack = []
    transitions = {}
    def add_transition(u, sym, v):
        transitions.setdefault(u, []).append((sym, v))

    alphabet = set()

    for ch in postfix:
        if ch == '.':  # concatenation
            f2 = stack.pop(); f1 = stack.pop()
            add_transition(f1.accept, None, f2.start)
            stack.append(Fragment(f1.start, f2.accept))
        elif ch == '|':  # union
            f2 = stack.pop(); f1 = stack.pop()
            s = new_state(); a = new_state()
            add_transition(s, None, f1.start); add_transition(s, None, f2.start)
            add_transition(f1.accept, None, a); add_transition(f2.accept, None, a)
            stack.append(Fragment(s, a))
        elif ch == '*':
            f = stack.pop()
            s = new_state(); a = new_state()
            add_transition(s, None, f.start); add_transition(s, None, a)
            add_transition(f.accept, None, f.start); add_transition(f.accept, None, a)
            stack.append(Fragment(s, a))
        elif ch == '+':
            f = stack.pop()
            s = new_state(); a = new_state()
            add_transition(s, None, f.start)
            add_transition(f.accept, None, f.start)
            add_transition(f.accept, None, a)
            stack.append(Fragment(s, a))
        elif ch == '?':
            f = stack.pop()
            s = new_state(); a = new_state()
            add_transition(s, None, f.start); add_transition(s, None, a)
            add_transition(f.accept, None, a)
            stack.append(Fragment(s, a))
        else:
            s = new_state(); a = new_state()
            add_transition(s, ch, a)
            alphabet.add(ch)
            stack.append(Fragment(s, a))

    if len(stack) != 1:
        raise ValueError("Invalid regular expression (stack != 1 after processing postfix).")
    frag = stack.pop()
    for st in range(next_state):
        transitions.setdefault(st, [])
    return transitions, frag.start, frag.accept, alphabet

def draw_nfa(transitions, start, accept, alphabet):
    states = sorted(transitions.keys())
    n = len(states)
    spacing = 2.0
    positions = {s: (spacing * i, 0) for i, s in enumerate(states)}
    fig, ax = plt.subplots(figsize=(max(6, n*1.0), 3))
    ax.set_aspect('equal')
    ax.axis('off')
    radius = 0.4
    for s, (x,y) in positions.items():
        circle = Circle((x,y), radius, fill=False, linewidth=1.5)
        ax.add_patch(circle)
        ax.text(x, y, str(s), horizontalalignment='center', verticalalignment='center', fontsize=10)
        if s == start:
            ax.annotate("", xy=(x - 1.0, y), xytext=(x - radius - 0.2, y),
                        arrowprops=dict(arrowstyle="->", lw=1.5))
        if s == accept:
            circle2 = Circle((x,y), radius-0.08, fill=False, linewidth=1.2)
            ax.add_patch(circle2)
    drawn_pairs = {}
    for u, edges in transitions.items():
        for sym, v in edges:
            label = 'ε' if sym is None else str(sym)
            pair = (u,v)
            count = drawn_pairs.get(pair, 0)
            drawn_pairs[pair] = count + 1
            x1,y1 = positions[u]; x2,y2 = positions[v]
            if u == v:
                loop_x = x1
                loop_y = y1 + radius + 0.4 + 0.3*count
                ax.annotate("", xy=(loop_x+0.01, loop_y), xytext=(x1+radius, y1+0.01),
                            arrowprops=dict(arrowstyle="-|>", connectionstyle=f"arc3,rad=0.6", lw=1.2))
                ax.text(loop_x+radius+0.2, loop_y-0.05, label, fontsize=9)
            else:
                rad = 0.15 + 0.12 * count
                arrow = FancyArrowPatch((x1,y1), (x2,y2), connectionstyle=f"arc3,rad={rad}",
                                        arrowstyle='->', mutation_scale=12, linewidth=1.2)
                ax.add_patch(arrow)
                mx, my = (x1 + x2) / 2.0, (y1 + y2) / 2.0
                dx, dy = x2 - x1, y2 - y1
                nx, ny = -dy, dx
                norm = math.hypot(nx, ny)
                if norm != 0:
                    nx, ny = nx / norm, ny / norm
                offset = 0.25 + 0.12*count
                lx, ly = mx + nx*offset, my + ny*offset
                ax.text(lx, ly, label, fontsize=9, horizontalalignment='center', verticalalignment='center')
    ax.set_xlim(-1.5, spacing*(n-1) + 1.5)
    ax.set_ylim(-2, 2)
    plt.title("NFA (Thompson's construction)")
    plt.show()

def transition_table(transitions, alphabet):
    symbols = sorted(list(alphabet))
    symbols_display = ['ε'] + symbols
    rows = []
    for st in sorted(transitions.keys()):
        row = {'state': st}
        table = {sym: [] for sym in symbols_display}
        for sym, dest in transitions[st]:
            key = 'ε' if sym is None else str(sym)
            table[key].append(dest)
        for sym in symbols_display:
            dests = sorted(set(table[sym]))
            row[sym] = "{" + ",".join(str(x) for x in dests) + "}" if dests else "{}"
        rows.append(row)
    cols = ['state'] + symbols_display
    df = pd.DataFrame(rows, columns=cols)
    return df
def build_and_show_nfa(regex):
    regex = regex.replace(" ", "")
    regex_with_concat = add_concat(regex)
    postfix = to_postfix(regex_with_concat)
    transitions, start, accept, alphabet = thompson(postfix)
    print("Regex:", regex)
    print("With explicit concat:", regex_with_concat)
    print("Postfix:", postfix)
    print(f"Start state: {start}, Accept state: {accept}\n")
    
    # Draw NFA
    draw_nfa(transitions, start, accept, alphabet)
    
    # Show transition table
    df = transition_table(transitions, alphabet)
    print("\nNFA Transition Table:")
    print(df.to_string(index=False))
    
    return transitions, start, accept, alphabet

regex = "ab"
transitions, start, accept, alphabet = build_and_show_nfa(regex)
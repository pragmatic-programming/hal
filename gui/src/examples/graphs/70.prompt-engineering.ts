import * as ihgraph from "ihgraph";
import { createNodeData, sanitizeDataAnnotations } from "../exampleAnnotations";

export function exampleGraphsPromptEngineering(): ihgraph.IHGraphFactoryInterface {
    return sanitizeDataAnnotations({
        annotations: {},
        nodes: [
            {
                annotations: createNodeData(),
                id: "Prompt",
                content: 
`Create an SCChart with 3 states red, greed, and blue 
and transition every 3 seconds.`
            },
            {
                annotations: createNodeData(),
                id: "Precursor",
                content: 
`I will give you a description of the SCCharts language.
        
**Key Concepts:**

1. **Synchronous Paradigm:** All computations are viewed as taking place in discrete, logical ticks or steps.
2. **States and Transitions:** SCCharts have both initial and regular states. Transitions, by default, are not immediate. They are checked one tick after their parent state is entered.
3. **Count Delays:** Require a condition to be true for several consecutive ticks before the transition fires. An integer in front of the condition indicates how often the trigger has to be true to continue.
4. **Expressions:** Expression for declared variables follow the C style. Hostcode is embedded with \`...\`.
5. **Declarations:** The keywords input or output declare input and output variables for communication with the environment. Local variables omit these keywords.
6. **Concurrency:** Processes can run concurrently in dedicated regions. They are included in the inner behaviour in superstates.
7. **Sequential Constructiveness:** Only assign values to variables in one concurrent region. Other regions are then only allowed to read them.

**Grammar:**

<scchart>          ::= 'scchart' <identifier> '{' <declarations> <states> '}'
<declarations>     ::= ( <declaration> )*
<declaration>      ::= <type> <identifier> ( '=' <expression> )?
<type>             ::= 'int' | 'bool' | 'float'

<states>           ::= ( <state> )+
<state>            ::= ( 'initial' )? ( 'final' )? 'state' <identifier> <state_body> 
<state_body>       ::= ('{' ( <entry_action> | <exit_action> )? <regions> '}')? <transitions>
<entry_action>     ::= 'entry' 'do' <action>
<exit_action>      ::= 'exit' 'do' <action>
<action>           ::= <identifier> '=' <expression> 
<transitions>      ::= ( <transition> )*
<transition>       ::= ( 'immediate' )? ('if' <condition>)? ('do' <action> )? 'go' 'to' <identifier>

<condition>        ::= <expression>
<expression>       ::= <identifier> | <literal> | <expression> <operator> <expression> | ...
<literal>          ::= <number> | 'true' | 'false' | ...
<operator>         ::= '+' | '-' | '*' | '/' | '&&' | '||' | ...

<identifier>       ::= [a-zA-Z_][a-zA-Z0-9_]*
<number>           ::= [0-9]+ ('.' [0-9]+)?

<regions>          ::= ( <region> )+ | <states>
<region>           ::= 'region' <identifier> ':' <states>

**Tipps:**
- To wait a specific amount of time, declare a tick or second input variable (e.g., 'input bool tick') and use count delay feature to wait to specify the amount (e.g., if 3 tick go to <state>). `
            },
            {
                annotations: createNodeData("PlainText", "file"),
                id: "Key",
                content: ""
            },
            {
                annotations: createNodeData("JavaScript"),
                id: "Request",
                content: ""
            },
            {
                annotations: createNodeData(),
                id: "Response",
                content: ""
            },
            {
                annotations: createNodeData(),
                id: "Result",
                content: ""
            }
        ],
        edgeTypes: [
            {
                id: "promptframe",
                priority: 16,
                immediate: true
            },
            {
                id: "gptrequest",
                priority: 8,
                immediate: false
            },
            {
                id: "scchartdiagram",
                priority: 4,
                immediate: false
            }
        ],
        edges: [
            {
                edgeType: "promptframe",
                sourceNode: "Prompt",
                targetNode: "Request"
            },
            {
                edgeType: "promptframe",
                sourceNode: "Precursor",
                targetNode: "Request"
            },
            {
                edgeType: "promptframe",
                sourceNode: "Key",
                targetNode: "Request"
            },
            {
                edgeType: "gptrequest",
                sourceNode: "Request",
                targetNode: "Response"
            },
            {
                edgeType: "scchartdiagram",
                sourceNode: "Response",
                targetNode: "Result"
            }
        ]
    });
}

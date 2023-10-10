let nodes = [];

document.getElementById('addNode').addEventListener('click', () => {
    const nodeType = document.getElementById('nodeType').value;
    const nodeName = document.getElementById('nodeName').value;

    if (nodeName.trim() === '') {
        alert('Please enter a node name.');
        return;
    }

    const newNode = { type: nodeType, name: nodeName };

    if (nodeType === 'child') {
        const parentNode = nodes.find(node => node.type === 'parent' && !node.children);
        if (parentNode) {
            parentNode.children = parentNode.children || [];
            parentNode.children.push(newNode);
        } else {
            alert('No suitable parent node found.');
            return;
        }
    } else {
        nodes.push(newNode);
    }

    renderNodes();
});

document.getElementById('deleteNode').addEventListener('click', () => {
    const selectedIndex = nodes.findIndex(node => node.selected);

    if (selectedIndex !== -1) {
        nodes.splice(selectedIndex, 1);
        renderNodes();
        selectNode(-1);
    }
});

function renderNodes() {
    const nodeDisplay = document.getElementById('nodeDisplay');
    nodeDisplay.innerHTML = '';
    renderNode(nodes);

    function renderNode(nodeList, parentNode = null) {
        nodeList.forEach((node, index) => {
            const nodeElement = document.createElement('div');
            nodeElement.className = `node ${node.type === 'child' ? 'child-node' : ''} ${node.selected ? 'selected-node' : ''}`;
            nodeElement.textContent = `${node.type.charAt(0).toUpperCase() + node.type.slice(1)}: ${node.name}`;
            nodeElement.addEventListener('click', () => selectNode(index));
            nodeDisplay.appendChild(nodeElement);

            if (parentNode && parentNode.type === 'parent') {
                const line = document.createElement('div');
                line.className = 'line';
                nodeDisplay.appendChild(line);
            }

            if (node.type === 'parent' && node.children) {
                renderNode(node.children, node);
            }
        });
    }
}
document.getElementById('updateNodeName').addEventListener('click', () => {
    const selectedIndex = nodes.findIndex(node => node.selected);

    if (selectedIndex !== -1) {
        const updatedName = prompt('Enter a new name for the selected node:');
        if (updatedName !== null) {
            nodes[selectedIndex].name = updatedName;
            renderNodes();
        }
    }
});
function selectNode(index) {
    nodes = nodes.map((node, i) => ({
        ...node,
        selected: i === index
    }));
    renderNodes();
}

renderNodes();

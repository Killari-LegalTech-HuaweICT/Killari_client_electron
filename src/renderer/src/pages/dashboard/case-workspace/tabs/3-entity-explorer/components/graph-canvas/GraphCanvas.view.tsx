/**
 * Graph Canvas View Component
 * Displays the graph visualization powered by Huawei GES
 */

import React, { useEffect, useCallback } from 'react'
import { Paper, Text, Group, ActionIcon, Loader, Center, Badge, Stack } from '@mantine/core'
import {
  IconSearch,
  IconMaximize,
  IconShare,
  IconUser,
  IconBuilding,
  IconMapPin,
  IconActivity
} from '@tabler/icons-react'
import type { GraphNodeType } from './graph-canvas.domain'
import { useGraphCanvas } from './graph-canvas.store'

interface GraphCanvasProps {
  caseId?: string
  onNodeSelect?: (nodeId: string | null) => void
}

/**
 * Icon mapping for node types
 */
const nodeTypeIcons: Record<GraphNodeType, React.ReactNode> = {
  Person: <IconUser size={14} />,
  Org: <IconBuilding size={14} />,
  Location: <IconMapPin size={14} />,
  Event: <IconActivity size={14} />
}

/**
 * Color mapping for node types
 */
const nodeTypeColors: Record<GraphNodeType, string> = {
  Person: '#3b82f6',
  Org: '#8b5cf6',
  Location: '#22c55e',
  Event: '#f97316'
}

/**
 * Graph Canvas Component
 */
export const GraphCanvas: React.FC<GraphCanvasProps> = ({
  caseId = 'default-case',
  onNodeSelect
}) => {
  const { nodes, edges, selectedNodeId, isLoading, nodeCountByType, fetchGraphData, selectNode } =
    useGraphCanvas(caseId)

  // Load graph data on mount
  useEffect(() => {
    fetchGraphData(caseId)
  }, [caseId, fetchGraphData])

  // Handle node selection
  const handleNodeClick = useCallback(
    (nodeId: string): void => {
      const newSelectedId = selectedNodeId === nodeId ? null : nodeId
      selectNode(newSelectedId)
      onNodeSelect?.(newSelectedId)
    },
    [selectedNodeId, selectNode, onNodeSelect]
  )

  if (isLoading) {
    return (
      <Paper
        h="100%"
        p="md"
        style={{
          backgroundColor: '#020617',
          borderColor: '#334155'
        }}
        withBorder
        radius="md"
      >
        <Center h="100%">
          <Loader size="lg" color="cyan" />
        </Center>
      </Paper>
    )
  }

  return (
    <Paper
      h="100%"
      p="md"
      style={{
        backgroundColor: '#020617',
        borderColor: '#334155',
        position: 'relative',
        overflow: 'hidden'
      }}
      withBorder
      radius="md"
    >
      {/* Toolbar */}
      <Group style={{ position: 'absolute', top: 20, right: 20, zIndex: 10 }}>
        <ActionIcon variant="light" color="gray">
          <IconSearch size={18} />
        </ActionIcon>
        <ActionIcon variant="light" color="gray">
          <IconMaximize size={18} />
        </ActionIcon>
        <ActionIcon variant="light" color="blue">
          <IconShare size={18} />
        </ActionIcon>
      </Group>

      {/* Node type legend */}
      <Stack style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }} gap="xs">
        {Object.entries(nodeCountByType).map(([type, count]) => (
          <Badge
            key={type}
            leftSection={nodeTypeIcons[type as GraphNodeType]}
            color={nodeTypeColors[type as GraphNodeType]}
            variant="light"
            size="sm"
          >
            {type}: {count}
          </Badge>
        ))}
      </Stack>

      {/* Graph visualization area */}
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        {nodes.length === 0 ? (
          <div style={{ textAlign: 'center', opacity: 0.3 }}>
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: '50%',
                border: '2px dashed #3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto'
              }}
            >
              <Text c="blue" fw={700}>
                GRAPH ENGINE
              </Text>
            </div>
            <Text mt="md" c="dimmed">
              Visualización de relaciones generada por Huawei GES
            </Text>
          </div>
        ) : (
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
            {/* Render edges */}
            {edges.map((edge) => {
              const sourceNode = nodes.find((n) => n.id === edge.source)
              const targetNode = nodes.find((n) => n.id === edge.target)
              if (!sourceNode?.x || !targetNode?.x || !sourceNode?.y || !targetNode?.y) return null

              const isHighlighted = selectedNodeId === edge.source || selectedNodeId === edge.target

              return (
                <g key={edge.id}>
                  <line
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={isHighlighted ? '#3b82f6' : '#334155'}
                    strokeWidth={isHighlighted ? 2 : 1}
                    opacity={selectedNodeId && !isHighlighted ? 0.2 : 1}
                  />
                  {edge.label && (
                    <text
                      x={(sourceNode.x + targetNode.x) / 2}
                      y={(sourceNode.y + targetNode.y) / 2 - 5}
                      fill="#64748b"
                      fontSize={10}
                      textAnchor="middle"
                      opacity={isHighlighted ? 1 : 0.5}
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              )
            })}

            {/* Render nodes */}
            {nodes.map((node) => {
              if (!node.x || !node.y) return null

              const isSelected = selectedNodeId === node.id
              const color = nodeTypeColors[node.type]

              return (
                <g
                  key={node.id}
                  onClick={() => handleNodeClick(node.id)}
                  style={{ cursor: 'pointer' }}
                  opacity={selectedNodeId && !isSelected ? 0.4 : 1}
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? 25 : 20}
                    fill={color}
                    stroke={isSelected ? '#fff' : 'transparent'}
                    strokeWidth={isSelected ? 3 : 0}
                  />
                  <text
                    x={node.x}
                    y={node.y + 35}
                    fill="#e2e8f0"
                    fontSize={11}
                    textAnchor="middle"
                    fontWeight={isSelected ? 600 : 400}
                  >
                    {node.label}
                  </text>
                </g>
              )
            })}
          </svg>
        )}
      </div>

      {/* Stats footer */}
      <Group
        style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}
        justify="space-between"
      >
        <Text size="xs" c="dimmed">
          {nodes.length} nodos • {edges.length} relaciones
        </Text>
        <Text size="xs" c="dimmed">
          Powered by Huawei GES
        </Text>
      </Group>
    </Paper>
  )
}

export default GraphCanvas

import React, { memo } from "react";
import { Label, Node, Port, NodeChildProps, NodeProps } from "reaflow";
import styled from "styled-components";

const StyledNode = styled(Node)`
  stroke: black;
  fill: ${({ theme }) => theme.BLACK_PRIMARY};
  stroke-width: 1;
`;

const StyledTextWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  width: 100%;
  height: 100%;
`;

const StyledText = styled.pre<{ width: number; height: number }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  color: ${({ theme }) => theme.SILVER};
`;

const baseLabelStyle = {
  fill: "transparent",
  stroke: "transparent",
  strokeWidth: 0,
};

const basePortStyle = {
  fill: "black",
};

const CustomNode = ({ nodeProps }) => {
  const { properties: data } = nodeProps;
  
  return (
    <StyledNode
      label={<Label style={baseLabelStyle} />}
      port={<Port style={basePortStyle} rx={10} ry={10} />}
      {...nodeProps}
    >
      {(nodeProps: NodeChildProps) => {
        const { width, height } = nodeProps;

        return (
          <foreignObject
            width={width}
            height={height}
            x={0} // Relative position from the parent Node component (aligned to top)
            y={0} // Relative position from the parent Node component (aligned to left)
            style={{
              position: "relative",
              pointerEvents: "none",
            }}
          >
            <StyledTextWrapper>
              <StyledText width={width} height={height}>
                {data.text}
              </StyledText>
            </StyledTextWrapper>
          </foreignObject>
        );
      }}
    </StyledNode>
  );
};

export const NodeWrapper = (nodeProps: NodeProps) => {
  return nodeProps.properties?.data?.type ? (
    <CustomNode nodeProps={nodeProps} />
  ) : (
    <Node {...nodeProps} />
  );
};

/** @jsx jsx */
// -- General Imports --
import {
  CaretDownOutlined,
  CaretUpOutlined,
  CloseOutlined,
  FileOutlined,
  FolderOutlined,
  HomeOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { jsx } from '@emotion/core';
import { Button, Layout, Menu, Popover, Space, Typography } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useCallback, useState } from 'react';
// -- Css --
import {
  scrollbarCss as baseScrollbarCss,
  tutorialSidebarWidth,
} from '../styles';
import { arrayEquals } from '../utils/array';
import {
  reduceDeletePage,
  reduceDeleteSubpage,
  reduceMovePage,
  reduceMoveSubpage,
  reducePage,
  reducePageGroup,
  reduceSubpage,
} from '../utils/tutorial';
import { EmptyMenuItem } from './intflask-antd';

// -- Setup --
const scrollbarCss = [
  {
    overflowY: 'auto',
    overflowX: 'hidden',
    height: 'calc(100% - 48px)', // 48px comes from the fixed footer to minimize the sidebar
  },
  baseScrollbarCss,
];
const { Sider } = Layout;
const { Text } = Typography;

export default function TwoLevelFixedSidebar({
  top,
  outerVisible,
  innerVisible,
  outerContent,
  innerContent,
}) {
  const [collapsedOuter, setCollapsedOuter] = useState(false);
  const onCollapseOuter = useCallback(
    (collapsed) => setCollapsedOuter(collapsed),
    [],
  );
  const [collapsedInner, setCollapsedInner] = useState(false);
  const onCollapseInner = useCallback(
    (collapsed) => setCollapsedInner(collapsed),
    [],
  );
  return (
    <div
      css={{
        height: `calc(100vh - ${top}px)`,
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
      }}
    >
      {/* Filler Sidebar(takes up the space that the fixed sidebar would use) */}
      {outerVisible && (
        <Sider
          theme="light"
          collapsible
          collapsed={collapsedOuter}
          onCollapse={onCollapseOuter}
          width={tutorialSidebarWidth}
          key="outerSidebarFiller"
        ></Sider>
      )}
      {innerVisible && (
        <Sider
          theme="light"
          collapsible
          collapsed={collapsedInner}
          onCollapse={onCollapseInner}
          width={tutorialSidebarWidth}
          key="innerSidebarFiller"
        ></Sider>
      )}

      {/* Fixed Sidebar Container */}
      <div
        css={{
          position: 'fixed',
          left: 0,
          top: `${top}px`,
          height: `calc(100vh - ${top}px)`,
          display: 'flex',
          flexDirection: 'row',
        }}
        key="fixedSidebarContainer"
      >
        {/* Outer Sidebar */}
        {outerVisible && (
          <Sider
            theme="light"
            collapsible
            collapsed={collapsedOuter}
            onCollapse={onCollapseOuter}
            width={tutorialSidebarWidth}
            css={scrollbarCss}
            key="fixedOuterSidebar"
          >
            {outerContent}
          </Sider>
        )}
        {/* Inner Sidebar */}
        {innerVisible && (
          <Sider
            theme="light"
            collapsible
            collapsed={collapsedInner}
            onCollapse={onCollapseInner}
            width={tutorialSidebarWidth}
            css={scrollbarCss}
            key="fixedInnerSidebar"
          >
            {innerContent}
          </Sider>
        )}
      </div>
    </div>
  );
}

function PopupItemControls({ onMoveUp, onMoveDown, onDelete, children }) {
  return (
    <Popover
      placement="right"
      content={
        <Space onClick={(event) => event.stopPropagation()}>
          <Button icon={<CaretUpOutlined />} size="small" onClick={onMoveUp} />
          <Button
            icon={<CaretDownOutlined />}
            size="small"
            onClick={onMoveDown}
          />
          <Button icon={<CloseOutlined />} size="small" onClick={onDelete} />
        </Space>
      }
    >
      {children}
    </Popover>
  );
}

export function TutorialEditorSidebarOuterContent({
  tutorial,
  currentSelectionPath,
  onTutorialChange,
  onCurrentSelectionChange,
}) {
  const addPageGroup = useCallback(() => {
    onTutorialChange(reducePageGroup(tutorial));
  }, [tutorial]);
  const addPage = useCallback(() => {
    onTutorialChange(reducePage(tutorial));
  }, [tutorial]);
  const movePageUp = useCallback(
    (i) => {
      onTutorialChange(reduceMovePage(tutorial, i, i - 1));
      if (currentSelectionPath === i) {
        onCurrentSelectionChange([i - 1]);
      }
    },
    [tutorial, currentSelectionPath],
  );
  const movePageDown = useCallback(
    (i) => {
      onTutorialChange(reduceMovePage(tutorial, i, i + 1));
      if (currentSelectionPath === i) {
        onCurrentSelectionChange([i + 1]);
      }
    },
    [tutorial, currentSelectionPath],
  );

  const [deletePagePromptVisible, setDeletePagePromptVisible] = useState(false);
  const [pageToDelete, setPageToDelete] = useState(null);
  const deletePage = useCallback(
    (i) => {
      onTutorialChange(reduceDeletePage(tutorial, i));
      let selection = [];
      if (currentSelectionPath.length > 0) {
        selection = [
          Math.min(
            tutorial.content.children.length - 2,
            currentSelectionPath[0],
          ),
        ];
      }
      onCurrentSelectionChange(selection);
    },
    [tutorial, currentSelectionPath],
  );
  const closeDeletePagePrompt = useCallback(() => {
    setDeletePagePromptVisible(false);
    setPageToDelete(null);
  }, []);
  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[
        currentSelectionPath.length === 0
          ? '-1'
          : String(currentSelectionPath[0]),
      ]}
    >
      <Modal
        title="Delete Page"
        visible={deletePagePromptVisible}
        onOk={() => {
          deletePage(pageToDelete);
          closeDeletePagePrompt();
        }}
        onCancel={closeDeletePagePrompt}
        okButtonProps={{
          danger: true,
        }}
        okText="Delete"
      >
        <Text strong>
          Are you sure you want to delete this page? All nested subpages will be
          deleted as well.
        </Text>
      </Modal>
      <Menu.Item
        key="-1"
        css={{ fontWeight: 'bold' }}
        icon={<HomeOutlined />}
        onClick={() => {
          onCurrentSelectionChange([]);
        }}
      >
        Main
      </Menu.Item>
      <Menu.Divider />
      {tutorial.content.children.length > 0 ? (
        tutorial.content.children.map((outer, i) => (
          <Menu.Item
            key={i}
            css={{ fontWeight: 'bold' }}
            onClick={() => {
              onCurrentSelectionChange([i]);
            }}
            icon={
              outer.children != null ? <FolderOutlined /> : <FileOutlined />
            }
          >
            <PopupItemControls
              onMoveUp={() => movePageUp(i)}
              onMoveDown={() => movePageDown(i)}
              onDelete={() => {
                setDeletePagePromptVisible(true);
                setPageToDelete(i);
              }}
            >
              {outer.name}
            </PopupItemControls>
          </Menu.Item>
        ))
      ) : (
        <EmptyMenuItem />
      )}
      <Menu.Divider />
      <Menu.Item icon={<PlusOutlined />} onClick={addPageGroup}>
        Add Page Group
      </Menu.Item>
      <Menu.Item icon={<PlusOutlined />} onClick={addPage}>
        Add Page
      </Menu.Item>
    </Menu>
  );
}

export function TutorialEditorSidebarInnerContent({
  tutorial,
  currentSelectionPath,
  onTutorialChange,
  onCurrentSelectionChange,
}) {
  const addSubpage = useCallback(
    (currentI) => {
      onTutorialChange(reduceSubpage(tutorial, currentI));
    },
    [tutorial],
  );
  const moveSubpageUp = useCallback(
    (i, j) => {
      onTutorialChange(reduceMoveSubpage(tutorial, i, j, j - 1));
      if (currentSelectionPath[0] === i && currentSelectionPath[1] === j) {
        onCurrentSelectionChange([i, j - 1]);
      }
    },
    [tutorial, currentSelectionPath],
  );
  const moveSubpageDown = useCallback(
    (i, j) => {
      onTutorialChange(reduceMoveSubpage(tutorial, i, j, j + 1));
      if (currentSelectionPath[0] === i && currentSelectionPath[1] === j) {
        onCurrentSelectionChange([i, j + 1]);
      }
    },
    [tutorial, currentSelectionPath],
  );

  const [deleteSubpagePromptVisible, setDeleteSubpagePromptVisible] = useState(
    false,
  );
  const [subpageToDelete, setSubpageToDelete] = useState(null);
  const deleteSubpage = useCallback(
    (i, j) => {
      onTutorialChange(reduceDeleteSubpage(tutorial, i, j));
      if (currentSelectionPath.length === 2) {
        const newMaxIndex =
          tutorial.content.children[currentSelectionPath[0]].children.length -
          2;
        if (newMaxIndex < 0) {
          onCurrentSelectionChange([currentSelectionPath[0]]);
        } else {
          const selection = [
            currentSelectionPath[0],
            Math.min(
              tutorial.content.children[currentSelectionPath[0]].children
                .length - 2,
              currentSelectionPath[1],
            ),
          ];
          onCurrentSelectionChange(selection);
        }
      }
    },
    [tutorial, currentSelectionPath],
  );
  const closeDeleteSubpagePrompt = useCallback(() => {
    setDeleteSubpagePromptVisible(false);
    setSubpageToDelete(null);
  }, []);
  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[String(currentSelectionPath[1])]}
    >
      <Modal
        title="Delete Subpage"
        visible={deleteSubpagePromptVisible}
        onOk={() => {
          deleteSubpage(...subpageToDelete);
          closeDeleteSubpagePrompt();
        }}
        onCancel={closeDeleteSubpagePrompt}
        okButtonProps={{
          danger: true,
        }}
        okText="Delete"
      >
        <Text strong>Are you sure you want to delete this subpage?</Text>
      </Modal>
      {tutorial.content.children[currentSelectionPath[0]].children.length >
      0 ? (
        tutorial.content.children[currentSelectionPath[0]].children.map(
          (inner, j) => (
            <Menu.Item
              key={j}
              onClick={() => {
                if (
                  !arrayEquals(currentSelectionPath, [
                    currentSelectionPath[0],
                    j,
                  ])
                ) {
                  onCurrentSelectionChange([currentSelectionPath[0], j]);
                }
              }}
            >
              <PopupItemControls
                onMoveUp={() => moveSubpageUp(currentSelectionPath[0], j)}
                onMoveDown={() => moveSubpageDown(currentSelectionPath[0], j)}
                onDelete={() => {
                  setDeleteSubpagePromptVisible(true);
                  setSubpageToDelete([currentSelectionPath[0], j]);
                }}
              >
                {inner.name}
              </PopupItemControls>
            </Menu.Item>
          ),
        )
      ) : (
        <EmptyMenuItem />
      )}
      <Menu.Divider />
      <Menu.Item
        icon={<PlusOutlined />}
        onClick={() => addSubpage(currentSelectionPath[0])}
      >
        Add Page
      </Menu.Item>
    </Menu>
  );
}

export function TutorialViewerSidebarOuterContent({
  tutorial,
  currentSelectionPath,
  onCurrentSelectionChange,
}) {
  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[
        currentSelectionPath.length === 0
          ? '-1'
          : String(currentSelectionPath[0]),
      ]}
    >
      <Menu.Item
        key="-1"
        css={{ fontWeight: 'bold' }}
        icon={<HomeOutlined />}
        onClick={() => {
          if (!arrayEquals(currentSelectionPath, [])) {
            onCurrentSelectionChange([]);
          }
        }}
      >
        Main
      </Menu.Item>
      <Menu.Divider />
      {tutorial.content.children.length > 0 ? (
        tutorial.content.children.map((outer, i) => (
          <Menu.Item
            key={i}
            css={{ fontWeight: 'bold' }}
            onClick={() => {
              if (!arrayEquals(currentSelectionPath, [i])) {
                onCurrentSelectionChange([i]);
              }
            }}
            icon={
              outer.children != null ? <FolderOutlined /> : <FileOutlined />
            }
          >
            {outer.name}
          </Menu.Item>
        ))
      ) : (
        <EmptyMenuItem />
      )}
    </Menu>
  );
}

export function TutorialViewerSidebarInnerContent({
  tutorial,
  currentSelectionPath,
  onCurrentSelectionChange,
}) {
  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[String(currentSelectionPath[1])]}
    >
      {tutorial.content.children[currentSelectionPath[0]].children.length >
      0 ? (
        tutorial.content.children[currentSelectionPath[0]].children.map(
          (inner, j) => (
            <Menu.Item
              key={j}
              onClick={() => {
                if (
                  !arrayEquals(currentSelectionPath, [
                    currentSelectionPath[0],
                    j,
                  ])
                ) {
                  onCurrentSelectionChange([currentSelectionPath[0], j]);
                }
              }}
            >
              {inner.name}
            </Menu.Item>
          ),
        )
      ) : (
        <EmptyMenuItem />
      )}
    </Menu>
  );
}

"use client";

import useGameContext from "@/context/useGameContext";
import JoinModal from "@/modals/JoinModal";
import LogInModal from "@/modals/LogInModal";
import SignUpModal from "@/modals/SignUpModal";
import ActionButton from "@/ui/ActionButton";
import ButtonList from "@/ui/ButtonList";
import Disclosure from "@/ui/Disclosure";
import Panel from "./Panel";
import PanelContent from "./PanelContent";
import PanelHeader from "./PanelHeader";

const UserPanel = () => {
  const {
    auth: { logOut, user, player },
  } = useGameContext();

  return (
    <Panel>
      <PanelHeader>User</PanelHeader>
      <PanelContent>Email: {user ? user.email : "-"}</PanelContent>
      <PanelContent>
        Player:{" "}
        {player ? (
          <span
            style={{
              color: `oklch(74% 0.14 ${player.color})`,
            }}
          >
            {player.name}
          </span>
        ) : (
          "-"
        )}
      </PanelContent>
      <PanelContent>
        {user ? (
          <ButtonList>
            <ActionButton
              onClick={async () => {
                await logOut();
              }}
            >
              Log Out
            </ActionButton>
            {player ? null : (
              <Disclosure
                content={(open, onClose) => (
                  <JoinModal
                    id="join"
                    open={open}
                    onClose={onClose}
                    onSuccess={() => {
                      onClose();
                    }}
                  />
                )}
              >
                Join Game
              </Disclosure>
            )}
          </ButtonList>
        ) : (
          <ButtonList>
            <Disclosure
              content={(open, onClose) => (
                <SignUpModal
                  id="sign-up"
                  open={open}
                  onClose={onClose}
                  onSuccess={() => {
                    onClose();
                  }}
                />
              )}
            >
              Sign Up
            </Disclosure>
            <Disclosure
              content={(open, onClose) => (
                <LogInModal
                  id="log-in"
                  open={open}
                  onClose={onClose}
                  onSuccess={() => {
                    onClose();
                  }}
                />
              )}
            >
              Log In
            </Disclosure>
          </ButtonList>
        )}
      </PanelContent>
    </Panel>
  );
};

export default UserPanel;

CREATE OR REPLACE FUNCTION notify_team_change()
RETURNS TRIGGER AS $$
DECLARE
    payload JSON;
BEGIN

    IF TG_OP = 'DELETE' THEN
        payload = json_build_object(
            'operation', TG_OP,
            'id', OLD.id,
            'team_name', OLD.team_name,
            'status', OLD.status
        );
    ELSE
        payload = json_build_object(
            'operation', TG_OP,
            'id', NEW.id,
            'team_name', NEW.team_name,
            'status', NEW.status
        );
    END IF;

    PERFORM pg_notify(
        'team_updates',
        payload::text
    );

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER team_change_trigger
AFTER INSERT OR UPDATE OR DELETE
ON teams
FOR EACH ROW
EXECUTE FUNCTION notify_team_change();
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Event } from "@/lib/types/event";

type eventFieldProps = {
  value: string | undefined;
  fieldName: string;
  setFormData: (value: React.SetStateAction<any>) => void;
  prevFormData: any ;
  isRequired?: boolean;
  stateName: string;
  placeholder?: string;
  type?: string;
  AlternativeComponent?: React.ForwardRefExoticComponent<
    Omit<
      React.DetailedHTMLProps<
        React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
      >,
      "ref"
    > &
      React.RefAttributes<HTMLTextAreaElement>
  >;
};

export default function EventField({
  value,
  fieldName,
  setFormData,
  prevFormData,
  isRequired,
  stateName,
  placeholder,
  type,
  AlternativeComponent,
}: eventFieldProps) {
  return (
    <div>
      {AlternativeComponent ? (
        <div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor={`${stateName}`}>{fieldName}</Label>
            </div>
            <AlternativeComponent
              onChange={(e) =>
                setFormData({ ...prevFormData, [stateName]: e.target.value })
              }
              value={value}
              placeholder={`${placeholder}`}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="space-y-2">
            <Label htmlFor={`${stateName}`}>{fieldName}</Label>
            <Input
              id={`${stateName}`}
              type={`${type}`}
              value={value}
              onChange={(e) =>
                setFormData({ ...prevFormData, [stateName]: e.target.value })
              }
              placeholder={`${placeholder}`}
              required={isRequired || false}
            />
          </div>
        </div>
      )}
    </div>
  );
}

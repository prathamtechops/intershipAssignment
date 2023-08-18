import React, { useState } from "react";
import {
    List,
    ListItem,
    Collapse,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

interface Department {
    department: string;
    sub_departments: string[];
}

const DepartmentList: React.FC<{ departments: Department[] }> = ({
    departments,
}) => {
    const [selected, setSelected] = useState<string[]>([]);
    const [expanded, setExpanded] = useState<string[]>([]);

    const handleToggle =
        (name: string) => (event: React.MouseEvent<HTMLDivElement>) => {
            if ((event.target as HTMLElement).tagName !== "INPUT") {
                const newSelected = selected.includes(name)
                    ? selected.filter((item) => item !== name)
                    : [...selected, name];
                setSelected(newSelected);
            }
        };

    const handleExpand = (name: string) => () => {
        const newExpanded = expanded.includes(name)
            ? expanded.filter((item) => item !== name)
            : [...expanded, name];
        setExpanded(newExpanded);
    };

    const isExpanded = (name: string) => expanded.includes(name);
    const isSelected = (name: string) => selected.includes(name);

    return (
        <List>
            {departments.map((department) => (
                <div key={department.department}>
                    <ListItem
                        button
                        onClick={handleExpand(department.department)}
                    >
                        <FormControlLabel
                            control={<Checkbox />}
                            label={department.department}
                        />
                        {isExpanded(department.department) ? (
                            <ExpandLess />
                        ) : (
                            <ExpandMore />
                        )}
                    </ListItem>
                    <Collapse
                        in={isExpanded(department.department)}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List component="div" disablePadding>
                            {department.sub_departments.map(
                                (sub_department) => (
                                    <div style={{ marginLeft: "40px" }}>
                                        <ListItem
                                            key={sub_department}
                                            button
                                            onClick={handleToggle(
                                                sub_department
                                            )}
                                        >
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label={sub_department}
                                            />
                                        </ListItem>
                                    </div>
                                )
                            )}
                        </List>
                    </Collapse>
                </div>
            ))}
        </List>
    );
};

const departmentsData: Department[] = [
    {
        department: "customer_service",
        sub_departments: ["support", "customer_success"],
    },
    {
        department: "design",
        sub_departments: ["graphic_design", "product_design", "web_design"],
    },
    {
        department: "engineering",
        sub_departments: [
            "back_end",
            "front_end",
            "full_stack",
            "qa",
            "ux",
            "dev_ops",
        ],
    },
    {
        department: "finance",
        sub_departments: ["accounting", "billing", "payroll"],
    },
];

const Department: React.FC = () => {
    return (
        <div>
            <DepartmentList departments={departmentsData} />
        </div>
    );
};

export default Department;

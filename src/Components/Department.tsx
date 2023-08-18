import React, { useState } from "react";

interface Department {
    department: string;
    sub_departments: string[];
}

const DepartmentList: React.FC<{ departments: Department[] }> = ({
    departments,
}) => {
    const [selected, setSelected] = useState<string[]>([]);
    const [expanded, setExpanded] = useState<string[]>([]);

    const handleToggle = (name: string) => () => {
        const newSelected = selected.includes(name)
            ? selected.filter((item) => item !== name)
            : [...selected, name];
        setSelected(newSelected);
    };

    const handleExpand = (name: string) => () => {
        const newExpanded = expanded.includes(name)
            ? expanded.filter((item) => item !== name)
            : [...expanded, name];
        setExpanded(newExpanded);
    };

    const isSelected = (name: string) => selected.includes(name);

    const isExpanded = (name: string) => expanded.includes(name);

    return (
        <ul>
            {departments.map((department) => (
                <li key={department.department}>
                    <div onClick={handleExpand(department.department)}>
                        <input
                            type="checkbox"
                            checked={isSelected(department.department)}
                            onChange={handleToggle(department.department)}
                        />
                        {department.department}
                        {isExpanded(department.department) ? " -" : " +"}
                    </div>
                    {isExpanded(department.department) && (
                        <ul>
                            {department.sub_departments.map(
                                (sub_department) => (
                                    <li key={sub_department}>
                                        <div style={{ marginLeft: "20px" }}>
                                            <input
                                                type="checkbox"
                                                checked={isSelected(
                                                    sub_department
                                                )}
                                                onChange={handleToggle(
                                                    sub_department
                                                )}
                                            />
                                            {sub_department}
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
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

const DepartmentComponent: React.FC = () => {
    return (
        <div>
            <DepartmentList departments={departmentsData} />
        </div>
    );
};

export default DepartmentComponent;

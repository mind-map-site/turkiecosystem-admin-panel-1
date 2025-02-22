import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { memo } from 'react';

function DemoContent() {
  return (
    <div>
      <Card>
        <CardHeader title={<Typography variant="h6">Welcome to Admin Dashboard</Typography>} />
        <CardContent>
          <p className="text-gray-500">Manage your platform efficiently with real-time insights.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default memo(DemoContent);
